import React, { useEffect } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

interface DiagramWrapperProps {
  diagramRef: React.RefObject<ReactDiagram | null>;
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray: Array<go.ObjectData>;
  // modelData: go.ObjectData;
  // skipsDiagramUpdate: boolean;
  onDiagramEvent: (e: go.DiagramEvent) => void;
  onModelChange: (e: go.IncrementalData) => void;
  // onNodeDoubleClicked: (e: go.IncrementalData) => void;
}

const DiagramWrapper: React.FC<DiagramWrapperProps> = ({
  diagramRef,
  nodeDataArray,
  linkDataArray,
  // modelData,
  // skipsDiagramUpdate,
  onDiagramEvent,
  onModelChange,
  // onNodeDoubleClicked,
}) => {
  // const diagramRef = useRef<ReactDiagram | null>(null);
  const LinePrefix = 20; // vertical starting point in document for all Messages and Activations
  const LineSuffix = 30; // vertical length beyond the last message time
  const MessageSpacing = 20; // vertical distance between Messages at different steps
  const ActivityWidth = 10; // width of each vertical activity bar
  const ActivityStart = 5; // height before start message time
  const ActivityEnd = 5; // height beyond end message time

  useEffect(() => {
    if (!diagramRef.current) return;

    const diagram = diagramRef.current.getDiagram();

    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener("ChangedSelection", onDiagramEvent);
    }

    return () => {
      if (diagram instanceof go.Diagram) {
        diagram.removeDiagramListener("ChangedSelection", onDiagramEvent);
      }
    };
  }, [onDiagramEvent]);

  const initDiagram = () => {
    function computeLifelineHeight(duration: number) {
      return LinePrefix + duration * MessageSpacing + LineSuffix;
    }

    function computeActivityLocation(act) {
      const groupdata = diagram.model.findNodeDataForKey(act.group);
      if (groupdata === null) return new go.Point();
      // get location of Lifeline's starting point
      const grouploc = go.Point.parse(groupdata.loc);
      return new go.Point(
        grouploc.x,
        convertTimeToY(act.start) - ActivityStart
      );
    }

    function backComputeActivityLocation(loc, act) {
      diagram.model.setDataProperty(
        act,
        "start",
        convertYToTime(loc.y + ActivityStart)
      );
    }

    function computeActivityHeight(duration) {
      return ActivityStart + duration * MessageSpacing + ActivityEnd;
    }
    function backComputeActivityHeight(height) {
      return (height - ActivityStart - ActivityEnd) / MessageSpacing;
    }

    // time is just an abstract small non-negative integer
    // here we map between an abstract time and a vertical position
    function convertTimeToY(t) {
      return t * MessageSpacing + LinePrefix;
    }
    function convertYToTime(y) {
      return (y - LinePrefix) / MessageSpacing;
    }

    function ensureLifelineHeights() {
      // iterate over all Activities (ignore Groups)
      const arr = diagram.model.nodeDataArray;
      let max = -1;
      for (let i = 0; i < arr.length; i++) {
        const act = arr[i];
        if (act.isGroup) continue;
        max = Math.max(max, act.start + act.duration);
      }
      if (max > 0) {
        // now iterate over only Groups
        for (let i = 0; i < arr.length; i++) {
          const gr = arr[i];
          if (!gr.isGroup) continue;
          if (max > gr.duration) {
            // this only extends, never shrinks
            diagram.model.setDataProperty(gr, "duration", max);
          }
        }
      }
    }

    // a custom routed Link
    class MessageLink extends go.Link {
      public time: number;

      constructor() {
        super();
        this.time = 0; // use this "time" value when this is the temporaryLink
      }

      getLinkPoint(node, port, _spot, _from, _ortho, _othernode, otherport) {
        const p = port.getDocumentPoint(go.Spot.Center);
        // const r = port.getDocumentBounds();
        const op = otherport.getDocumentPoint(go.Spot.Center);

        const data = this.data;
        const time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property

        const aw = this.findActivityWidth(node, time);
        const x = op.x > p.x ? p.x + aw / 2 : p.x - aw / 2;
        const y = convertTimeToY(time);
        return new go.Point(x, y);
      }

      findActivityWidth(node, time) {
        let aw = ActivityWidth;
        if (node instanceof go.Group) {
          // see if there is an Activity Node at this point -- if not, connect the link directly with the Group's lifeline
          if (
            !node.memberParts.any((mem) => {
              const act = mem.data;
              return (
                act !== null &&
                act.start <= time &&
                time <= act.start + act.duration
              );
            })
          ) {
            aw = 0;
          }
        }
        return aw;
      }

      getLinkDirection(
        _node,
        port,
        _linkpoint,
        _spot,
        _from,
        _ortho,
        _othernode,
        otherport
      ) {
        const p = port.getDocumentPoint(go.Spot.Center);
        const op = otherport.getDocumentPoint(go.Spot.Center);
        const right = op.x > p.x;
        return right ? 0 : 180;
      }

      computePoints() {
        if (this.fromNode === this.toNode) {
          // also handle a reflexive link as a simple orthogonal loop
          const data = this.data;
          const time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property
          const p = this.fromNode.port.getDocumentPoint(go.Spot.Center);
          const aw = this.findActivityWidth(this.fromNode, time);

          const x = p.x + aw / 2;
          const y = convertTimeToY(time);
          this.clearPoints();
          this.addPoint(new go.Point(x, y));
          this.addPoint(new go.Point(x + 50, y));
          this.addPoint(new go.Point(x + 50, y + 5));
          this.addPoint(new go.Point(x, y + 5));
          return true;
        } else {
          return super.computePoints();
        }
      }
    }
    // end MessageLink

    class MessagingTool extends go.LinkingTool {
      time: number;
      constructor() {
        super();
        number: 0;
        // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
        // For details, see https://gojs.net/latest/intro/buildingObjects.html
        const $ = go.GraphObject.make;
        this.temporaryLink = $(
          MessageLink,
          $(go.Shape, "Rectangle", { stroke: "magenta", strokeWidth: 2 }),
          $(go.Shape, { toArrow: "OpenTriangle", stroke: "magenta" })
        );
      }

      doActivate() {
        super.doActivate();
        const time = convertYToTime(this.diagram.firstInput.documentPoint.y);
        this.time = Math.ceil(time); // round up to an integer value
      }

      /*
        fromnode es el id desde donde
    
        tonode id hacia donde
    
      */
      insertLink(fromnode, fromport, tonode, toport) {
        // console.log(`Modifico link`);
        // console.log(`fromnode: ${fromnode}`);
        // console.log(`fromport: ${fromport}`);
        // console.log(`tonode: ${tonode}`);
        // console.log(`toport: ${toport}`);

        // Crea el link
        const newlink = super.insertLink(fromnode, fromport, tonode, toport);
        if (newlink !== null) {
          const model = this.diagram.model;
          // specify the time of the message
          const start = this.time;
          const duration = 1;
          newlink.data.time = start;
          model.setDataProperty(newlink.data, "text", "mensaje");
          // and create a new Activity node data in the "to" group data
          const newact = {
            group: newlink.data.to,
            start: start,
            duration: duration,
          };

          model.addNodeData(newact); // Añadir node

          // Se asegura que todas las líneas de vida tengan suficiente altura para acomodar las actividades
          ensureLifelineHeights();
        }
        return newlink;
      }
    }
    // end MessagingTool

    // A custom DraggingTool that supports dragging any number of MessageLinks up and down --
    // changing their data.time value.
    class MessageDraggingTool extends go.DraggingTool {
      // override the standard behavior to include all selected Links,
      // even if not connected with any selected Nodes
      computeEffectiveCollection(parts, options) {
        const result = super.computeEffectiveCollection(parts, options);
        // add a dummy Node so that the user can select only Links and move them all
        result.add(new go.Node(), new go.DraggingInfo(new go.Point()));
        // normally this method removes any links not connected to selected nodes;
        // we have to add them back so that they are included in the "parts" argument to moveParts
        parts.each((part) => {
          if (part instanceof go.Link) {
            result.add(part, new go.DraggingInfo(part.getPoint(0).copy()));
          }
        });
        return result;
      }

      // override to allow dragging when the selection only includes Links
      mayMove() {
        return !this.diagram.isReadOnly && this.diagram.allowMove;
      }

      // override to move Links (which are all assumed to be MessageLinks) by
      // updating their Link.data.time property so that their link routes will
      // have the correct vertical position
      moveParts(parts, offset, check) {
        super.moveParts(parts, offset, check);
        const it = parts.iterator;
        while (it.next()) {
          if (it.key instanceof go.Link) {
            const link = it.key;
            const startY = it.value.point.y; // DraggingInfo.point.y
            let y = startY + offset.y; // determine new Y coordinate value for this link
            const cellY = this.gridSnapCellSize.height;
            y = Math.round(y / cellY) * cellY; // snap to multiple of gridSnapCellSize.height
            const t = Math.max(0, convertYToTime(y));
            link.diagram.model.set(link.data, "time", t);
            link.invalidateRoute();
          }
        }
      }
    }
    // end MessageDraggingTool

    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, {
      allowCopy: false,
      linkingTool: $(MessagingTool), // defined below
      "resizingTool.isGridSnapEnabled": true,
      draggingTool: $(MessageDraggingTool), // defined below
      "draggingTool.gridSnapCellSize": new go.Size(1, MessageSpacing / 4),
      "draggingTool.isGridSnapEnabled": true,
      SelectionMoved: ensureLifelineHeights,
      PartResized: ensureLifelineHeights,
      "undoManager.isEnabled": true,
      // doubleClick: function (e) {
      //   // Obtén la posición del clic
      //   const point = e.diagram.lastInput.documentPoint;

      //   // Llama a la función para agregar un nodo en esa posición
      //   onNodeDoubleClicked(point);
      // },
      model: new go.GraphLinksModel({
        linkKeyProperty: "key",
      }),
    });

    // Agregar grupo
    diagram.groupTemplate = $(
      go.Group,
      "Vertical",
      {
        locationSpot: go.Spot.Bottom,
        locationObjectName: "HEADER",
        minLocation: new go.Point(0, 0),
        maxLocation: new go.Point(9999, 0),
        selectionObjectName: "HEADER",
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Panel,
        "Auto",
        { name: "HEADER" },
        $(go.Shape, "Rectangle", {
          fill: $(go.Brush, "Linear", {
            0: "#bbdefb",
            1: go.Brush.darkenBy("#bbdefb", 0.1),
          }),
          stroke: null,
        }),
        $(
          go.TextBlock,
          {
            margin: 5,
            font: "400 10pt Source Sans Pro, sans-serif",
          },
          new go.Binding("text", "text")
        )
      ),
      $(
        go.Shape,
        {
          figure: "LineV",
          fill: null,
          stroke: "gray",
          strokeDashArray: [3, 3],
          width: 1,
          alignment: go.Spot.Center,
          portId: "",
          fromLinkable: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableDuplicates: true,
          cursor: "pointer",
        },
        new go.Binding("height", "duration", computeLifelineHeight)
      )
    );

    // define the Activity Node template
    diagram.nodeTemplate = $(
      go.Node,
      {
        // locationSpot: go.Spot.Top,
        locationObjectName: "SHAPE",
        minLocation: new go.Point(NaN, LinePrefix - ActivityStart),
        maxLocation: new go.Point(NaN, 19999),
        selectionObjectName: "SHAPE",
        resizable: true,
        resizeObjectName: "SHAPE",
        resizeAdornmentTemplate: $(
          go.Adornment,
          "Spot",
          $(go.Placeholder),
          $(
            go.Shape, // only a bottom resize handle
            {
              alignment: go.Spot.Bottom,
              cursor: "col-resize",
              desiredSize: new go.Size(6, 6),
              fill: "yellow",
            }
          )
        ),
      },
      new go.Binding("location", "", computeActivityLocation).makeTwoWay(
        backComputeActivityLocation
      ),
      $(
        go.Shape,
        "Rectangle",
        {
          name: "SHAPE",
          fill: "white",
          stroke: "black",
          width: ActivityWidth,
          // allow Activities to be resized down to 1/4 of a time unit
          minSize: new go.Size(ActivityWidth, computeActivityHeight(0.25)),
        },
        new go.Binding("height", "duration", computeActivityHeight).makeTwoWay(
          backComputeActivityHeight
        )
      )
    );

    // define the Message Link template.
    diagram.linkTemplate = $(
      MessageLink, // defined below
      { selectionAdorned: true, curviness: 0 },
      $(go.Shape, "Rectangle", { stroke: "black" }),
      $(go.Shape, { toArrow: "OpenTriangle", stroke: "black" }),
      $(
        go.TextBlock,
        {
          font: "400 9pt Source Sans Pro, sans-serif",
          segmentIndex: 0,
          segmentOffset: new go.Point(NaN, NaN),
          isMultiline: false,
          editable: true,
        },
        new go.Binding("text", "text").makeTwoWay()
      )
    );

    diagram.addDiagramListener("ObjectDoubleClicked", function (event) {
      var diagramEvent = event.diagram.selection.first();

      // Verificar si el objeto seleccionado es un nodo
      var selectedObject = diagramEvent;
      console.log(selectedObject);
      // Obtener el nuevo nombre del usuario (podrías mostrar un cuadro de diálogo para que el usuario ingrese un nuevo nombre)
      // console.log(diagramEvent.fc)
      var nuevoNombre = prompt("Ingrese el nuevo nombre del nodo:", selectedObject.data.text);
      if (nuevoNombre !== null) {
        // Actualizar el nombre del nodo en el modelo de datos
        diagram.startTransaction("CambiarNombreNodo");
        console.log("electedObject.data : ", selectedObject.data)
        diagram.model.setDataProperty(selectedObject.data, "text", nuevoNombre);
        diagram.commitTransaction("CambiarNombreNodo");
      }
    });

    return diagram;
  };

  return (
    <ReactDiagram
      ref={diagramRef}
      divClassName="diagram-component"
      initDiagram={initDiagram}
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      // modelData={modelData}
      onModelChange={onModelChange}
    // skipsDiagramUpdate={skipsDiagramUpdate}
    />
  );
};

export default DiagramWrapper;