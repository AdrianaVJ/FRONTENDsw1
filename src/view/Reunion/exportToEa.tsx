export class EAConverter {

    static generateUniqueId() {
        // Implementa la lógica para generar un ID único aquí
        // Puedes usar un paquete como 'uuid' para generar UUIDs únicos
        // Ejemplo:import { v4 as uuidv4 } from 'uuid'; return uuidv4();
        // Por ahora, devolveré un número aleatorio para demostración
        return Math.floor(Math.random() * 1000000).toString();
    }

    static generateTaggedValues(tags: Record<string, string>) {
        return Object.entries(tags)
            .map(([tag, value]) => `<UML:TaggedValue tag="${tag}" value="${value}"/>`)
            .join('');
    }
    static converterToEa(nodeDataArray: any[], _linkDataArray: any[]): string {
        let eaCode = '';
        eaCode += `<?xml version="1.0" encoding="windows-1252"?>\n`;
        eaCode += `<XMI xmi.version="1.1" xmlns:UML="omg.org/UML1.3" timestamp="2023-10-16 22:50:15">\n`;
        eaCode += `<XMI.header>\n`;
        eaCode += `<XMI.documentation>\n`;
        eaCode += `<XMI.exporter>Enterprise Architect</XMI.exporter>\n`;
        eaCode += `<XMI.exporterVersion>2.5</XMI.exporterVersion>\n`;
        eaCode += `</XMI.documentation>\n`;
        eaCode += `</XMI.header>\n`;
        eaCode += `<XMI.content>\n`;
        eaCode += `<UML:Model name="EA Model" xmi.id="MX_EAID_${EAConverter.generateUniqueId()}">\n`;
        eaCode += `<UML:Namespace.ownedElement>\n`;
        eaCode += `<UML:Class name="EARootClass" xmi.id="EAID_11111111_5487_4080_A7F4_41526CB0AA00" isRoot="true" isLeaf="false" isAbstract="false"/>\n`;

        eaCode += `<UML:Package name="Model" xmi.id="EAID_${EAConverter.generateUniqueId()}" isRoot="true" isLeaf="false" isAbstract="false" visibility="public">`;
        eaCode += `<UML:ModelElement.taggedValue>`;
        eaCode += `<UML:TaggedValue tag="created" value="2012-04-17 00:00:00"/>`;
        eaCode += `<UML:TaggedValue tag="modified" value="2012-04-17 00:00:00"/>`;
        eaCode += `<UML:TaggedValue tag="iscontrolled" value="FALSE"/>`;
        eaCode += `<UML:TaggedValue tag="lastloaddate" value="2023-10-16 16:26:11"/>`;
        eaCode += `<UML:TaggedValue tag="isprotected" value="FALSE"/>`;
        eaCode += `<UML:TaggedValue tag="usedtd" value="FALSE"/>`;
        eaCode += `<UML:TaggedValue tag="logxml" value="FALSE"/>`;
        eaCode += `<UML:TaggedValue tag="tpos" value="0"/>`;
        eaCode += `<UML:TaggedValue tag="packageFlags" value="CRC=0;isModel=1;"/>`;
        eaCode += `<UML:TaggedValue tag="batchsave" value="0"/>`;
        eaCode += `<UML:TaggedValue tag="batchload" value="0"/>`;
        eaCode += `<UML:TaggedValue tag="ea_stype" value="Public"/>`;
        eaCode += `<UML:TaggedValue tag="tpos" value="0"/>`;
        eaCode += `</UML:ModelElement.taggedValue>`;

        eaCode += `<UML:Namespace.ownedElement>`;
        eaCode += `<UML:Collaboration xmi.id="EMX_EAID_${EAConverter.generateUniqueId()}" name="Collaborations">`;
        eaCode += `<UML:Namespace.ownedElement>`;
        eaCode += ` <UML:ClassifierRole name="Use Case Model" xmi.id="EMX_EAID_${EAConverter.generateUniqueId()}" visibility="public" base="EAID_11111111_5487_4080_A7F4_41526CB0AA00">`;

        eaCode += ` <UML:ModelElement.taggedValue>`;
        eaCode += ` <UML:TaggedValue tag="isAbstract" value="false" />`;
        eaCode += ` <UML:TaggedValue tag="isSpecification" value="false" />`;
        eaCode += ` <UML:TaggedValue tag="ea_stype" value="Package" />`;
        eaCode += ` <UML:TaggedValue tag="ea_ntype" value="0" />`;
        eaCode += ` <UML:TaggedValue tag="isActive" value="false" />`;
        eaCode += ` <UML:TaggedValue tag="package" value="EAPK_D9D8864A_2E62_49f4_84D5_23276CF33E74" />`;
        eaCode += ` <UML:TaggedValue tag="date_created" value="2023-10-16 16:26:10" />`;
        eaCode += ` <UML:TaggedValue tag="date_modified" value="2023-10-17 02:38:19" />`;
        eaCode += ` <UML:TaggedValue tag="tagged" value="0" />`;
        eaCode += ` <UML:TaggedValue tag="package2" value="EAID_6EE9AF8D_A279_46e0_8BA8_ED712C309EF7" />`;
        eaCode += ` <UML:TaggedValue tag="package_name" value="Model" />`;
        eaCode += ` <UML:TaggedValue tag="phase" value="1.0" />`;
        eaCode += ` <UML:TaggedValue tag="author" value="jmari" />`;
        eaCode += ` <UML:TaggedValue tag="complexity" value="1" />`;
        eaCode += ` <UML:TaggedValue tag="status" value="Proposed" />`;
        eaCode += ` <UML:TaggedValue tag="tpos" value="3" />`;
        eaCode += ` <UML:TaggedValue tag="ea_localid" value="15" />`;
        eaCode += ` <UML:TaggedValue tag="ea_eleType" value="package" />`;
        eaCode += ` <UML:TaggedValue tag="style" value="BackColor=-1;BorderColor=-1;BorderWidth=-1;FontColor=-1;VSwimLanes=1;HSwimLanes=1;BorderStyle=0;" />`;
        eaCode += ` </UML:ModelElement.taggedValue>`;

        eaCode += `</UML:ClassifierRole>`;
        eaCode += ` <UML:ClassifierRole name="Use Case Model" xmi.id="EMX_EAID_${EAConverter.generateUniqueId()}" visibility="public" base="EAID_11111111_5487_4080_A7F4_41526CB0AA00">`;

        eaCode += ` <UML:ModelElement.taggedValue>`;
        eaCode += ` <UML:TaggedValue tag="isAbstract" value="false" />`;
        eaCode += ` <UML:TaggedValue tag="isSpecification" value="false" />`;
        eaCode += ` <UML:TaggedValue tag="ea_stype" value="Package" />`;
        eaCode += ` <UML:TaggedValue tag="ea_ntype" value="0" />`;
        eaCode += ` <UML:TaggedValue tag="isActive" value="false" />`;
        eaCode += ` <UML:TaggedValue tag="package" value="EAPK_D9D8864A_2E62_49f4_84D5_23276CF33E74" />`;
        eaCode += ` <UML:TaggedValue tag="date_created" value="2023-10-16 16:26:10" />`;
        eaCode += ` <UML:TaggedValue tag="date_modified" value="2023-10-17 02:38:19" />`;
        eaCode += ` <UML:TaggedValue tag="tagged" value="0" />`;
        eaCode += ` <UML:TaggedValue tag="package2" value="EAID_6EE9AF8D_A279_46e0_8BA8_ED712C309EF7" />`;
        eaCode += ` <UML:TaggedValue tag="package_name" value="Model" />`;
        eaCode += ` <UML:TaggedValue tag="phase" value="1.0" />`;
        eaCode += ` <UML:TaggedValue tag="author" value="jmari" />`;
        eaCode += ` <UML:TaggedValue tag="complexity" value="1" />`;
        eaCode += ` <UML:TaggedValue tag="status" value="Proposed" />`;
        eaCode += ` <UML:TaggedValue tag="tpos" value="3" />`;
        eaCode += ` <UML:TaggedValue tag="ea_localid" value="15" />`;
        eaCode += ` <UML:TaggedValue tag="ea_eleType" value="package" />`;
        eaCode += ` <UML:TaggedValue tag="style" value="BackColor=-1;BorderColor=-1;BorderWidth=-1;FontColor=-1;VSwimLanes=1;HSwimLanes=1;BorderStyle=0;" />`;
        eaCode += ` </UML:ModelElement.taggedValue>`;

        eaCode += `</UML:ClassifierRole>`;

        eaCode += `</UML:Namespace.ownedElement>`;
        eaCode += `<UML:Collaboration.interaction/>`;
        eaCode += `</UML:Collaboration>`;

        eaCode += `<UML:Package name="Use Case Model" xmi.id="EAID_11111111_5487_4080_A7F4_41526CB0AA00" isRoot="false" isLeaf="false" isAbstract="false" visibility="public">`;
        eaCode += `<UML:ModelElement.taggedValue>`;
        eaCode += `${EAConverter.generateTaggedValues({
            parent: 'EAPK_D9D8864A_2E62_49f4_84D5_23276CF33E74',
            ea_package_id: '2',
            created: '2023-10-16 16:26:10',
            modified: '2023-10-16 16:26:11',
            iscontrolled: 'FALSE',
            lastloaddate: '2023-10-16 16:26:10',
            lastsavedate: '2023-10-16 16:26:10',
            isprotected: 'FALSE',
            usedtd: 'FALSE',
            logxml: 'FALSE',
            tpos: '3',
            packageFlags: 'isModel=1;VICON=1;CRC=0;',
            batchsave: '0',
            batchload: '0',
            phase: '1.0',
            status: 'Proposed',
            author: 'jmari',
            complexity: '1',
            ea_stype: 'Public',
        })}\n`;
        eaCode += `<UML:TaggedValue tag="tpos" value="3"/>\n`; //ultimo dentro I
        eaCode += `</UML:ModelElement.taggedValue>\n`;
        eaCode += `<UML:Namespace.ownedElement>\n`;
        eaCode += `<UML:Collaboration xmi.id="EAID_${EAConverter.generateUniqueId()}_Collaboration" name="Collaborations">\n`;
        eaCode += `<UML:Namespace.ownedElement>\n`;
        // Iterar sobre nodeDataArray y generar elementos UML:ClassifierRole para cada nodo
        nodeDataArray.forEach(node => {
            eaCode += `<UML:ClassifierRole name="${node.text}" xmi.id="EAID_${EAConverter.generateUniqueId()}" visibility="public" base="EAID_11111111_5487_4080_A7F4_41526CB0AA00">`;
            eaCode += `<UML:ModelElement.taggedValue>`;
            eaCode += `<UML:TaggedValue tag="isAbstract" value="false"/>`;
            eaCode += `<UML:TaggedValue tag="isSpecification" value="false"/>`;
            eaCode += `<UML:TaggedValue tag="ea_stype" value="Sequence"/>`;
            eaCode += `<UML:TaggedValue tag="ea_ntype" value="0"/>`;
            eaCode += `<UML:TaggedValue tag="version" value="1.0"/>`;
            eaCode += `<UML:TaggedValue tag="isActive" value="false"/>`;
            eaCode += `<UML:TaggedValue tag="package" value="EAPK_6EE9AF8D_A279_46e0_8BA8_ED712C309EF7"/>`;
            eaCode += `<UML:TaggedValue tag="date_created" value="2023-10-16 22:42:08"/>`;
            eaCode += `<UML:TaggedValue tag="date_modified" value="2023-10-16 22:42:12"/>`;
            eaCode += `<UML:TaggedValue tag="gentype" value="&lt;none&gt;"/>`;
            eaCode += `<UML:TaggedValue tag="tagged" value="0"/>`;
            eaCode += `<UML:TaggedValue tag="package_name" value="Use Case Model"/>`;
            eaCode += `<UML:TaggedValue tag="phase" value="1.0"/>`;
            eaCode += `<UML:TaggedValue tag="author" value="jmari"/>`;
            eaCode += `<UML:TaggedValue tag="complexity" value="1"/>`;
            eaCode += `<UML:TaggedValue tag="status" value="Proposed"/>`;
            eaCode += `<UML:TaggedValue tag="tpos" value="0"/>`;
            eaCode += `<UML:TaggedValue tag="ea_localid" value="${node.__gohashid}"/>`;
            eaCode += `<UML:TaggedValue tag="ea_eleType" value="element"/>`;
            eaCode += `<UML:TaggedValue tag="style" value="BackColor=-1;BorderColor=-1;BorderWidth=-1;FontColor=-1;VSwimLanes=1;HSwimLanes=1;BorderStyle=0;"/>`;
            eaCode += `</UML:ModelElement.taggedValue>`;
            eaCode += `</UML:ClassifierRole>`;
        });
        // Continuar generando otros elementos según sea necesario (por ejemplo, los enlaces/linkDataArray)
        eaCode += `</UML:Namespace.ownedElement>\n`;
        // eaCode += `</UML:Collaboration.interaction>\n`;
        eaCode += `</UML:Collaboration>\n`;
        eaCode += `</UML:Namespace.ownedElement>\n`;
        eaCode += `</UML:Package>\n`;
        eaCode += `</UML:Namespace.ownedElement>\n`;
        eaCode += `</UML:Package>\n`;
        eaCode += `</UML:Namespace.ownedElement>\n`;
        eaCode += `</UML:Model>\n`;

        eaCode += ` <UML:Diagram name="Prueba22" xmi.id="EAID_C5778964_85E9_4cbd_974D_E33F3D564510" diagramType="SequenceDiagram" owner="EAPK_6EE9AF8D_A279_46e0_8BA8_ED712C309EF7" toolName="Enterprise Architect 2.5">`;
        eaCode += `     <UML:ModelElement.taggedValue>`;
        eaCode += `     <UML:TaggedValue tag="version" value="1.0" />`;
        eaCode += `     <UML:TaggedValue tag="author" value="jmari" />`;
        eaCode += `     <UML:TaggedValue tag="created_date" value="2023-10-16 00:00:00" />`;
        eaCode += `     <UML:TaggedValue tag="modified_date" value="2023-10-17 01:46:21" />`;
        eaCode += `     <UML:TaggedValue tag="package" value="EAPK_6EE9AF8D_A279_46e0_8BA8_ED712C309EF7" />`;
        eaCode += `     <UML:TaggedValue tag="type" value="Sequence" />`;
        eaCode += `     <UML:TaggedValue tag="swimlanes" value="locked=false;orientation=0;width=0;inbar=false;names=false;color=-1;bold=false;fcol=0;tcol=-1;ofCol=-1;ufCol=-1;hl=0;ufh=0;cls=0;SwimlaneFont=lfh:-10,lfw:0,lfi:0,lfu:0,lfs:0,lfface:Calibri,lfe:0,lfo:0,lfchar:1,lfop:0,lfcp:0,lfq:0,lfpf=0,lfWidth=0;" />`;
        eaCode += `     <UML:TaggedValue tag="matrixitems" value="locked=false;matrixactive=false;swimlanesactive=true;kanbanactive=false;width=1;clrLine=0;" />`;
        eaCode += `     <UML:TaggedValue tag="ea_localid" value="6" />`;
        eaCode += `     <UML:TaggedValue tag="EAStyle" value="ShowPrivate=1;ShowProtected=1;ShowPublic=1;HideRelationships=0;Locked=0;Border=1;HighlightForeign=1;PackageContents=1;SequenceNotes=0;ScalePrintImage=0;PPgs.cx=1;PPgs.cy=1;DocSize.cx=827;DocSize.cy=1169;ShowDetails=0;Orientation=P;Zoom=100;ShowTags=0;OpParams=1;VisibleAttributeDetail=0;ShowOpRetType=1;ShowIcons=1;CollabNums=0;HideProps=0;ShowReqs=0;ShowCons=0;PaperSize=9;HideParents=0;UseAlias=0;HideAtts=0;HideOps=0;HideStereo=0;HideElemStereo=0;ShowTests=0;ShowMaint=0;ConnectorNotation=UML 2.1;ExplicitNavigability=0;ShowShape=1;AdvancedElementProps=1;AdvancedFeatureProps=1;AdvancedConnectorProps=1;m_bElementClassifier=1;ShowNotes=0;SuppressBrackets=0;SuppConnectorLabels=0;PrintPageHeadFoot=0;ShowAsList=0;" />`;
        eaCode += `     <UML:TaggedValue tag="styleex" value="SaveTag=086C85DF;ExcludeRTF=0;DocAll=0;HideQuals=0;AttPkg=1;ShowTests=0;ShowMaint=0;SuppressFOC=0;INT_ARGS=;INT_RET=;INT_ATT=;SeqTopMargin=50;MatrixActive=0;SwimlanesActive=1;KanbanActive=0;MatrixLineWidth=1;MatrixLineClr=0;MatrixLocked=0;TConnectorNotation=UML 2.1;TExplicitNavigability=0;AdvancedElementProps=1;AdvancedFeatureProps=1;AdvancedConnectorProps=1;m_bElementClassifier=1;ProfileData=;MDGDgm=;STBLDgm=;ShowNotes=0;VisibleAttributeDetail=0;ShowOpRetType=1;SuppressBrackets=0;SuppConnectorLabels=0;PrintPageHeadFoot=0;ShowAsList=0;SuppressedCompartments=;Theme=:119;" />`;
        eaCode += `  </UML:ModelElement.taggedValue>`;
        eaCode += `      <UML:Diagram.element>`;
        eaCode += `          <UML:DiagramElement geometry="Left=586;Top=50;Right=676;Bottom=405;" subject="EAID_A5ECEDAF_45AF_43b0_B26E_5D0A3F4FBE03" seqno="1" style="DUID=ED969C66;" />`;
        eaCode += `          <UML:DiagramElement geometry="Left=405;Top=50;Right=495;Bottom=405;" subject="EAID_E8409EDB_8586_4c55_A6BD_A65BA11E90E1" seqno="2" style="DUID=218FA761;" />`;
        eaCode += `      </UML:Diagram.element>`;
        eaCode += `</UML:Diagram>`;

        eaCode += `</XMI.content>\n`;
        eaCode += `	<XMI.difference/>\n`;
        eaCode += `<XMI.extensions xmi.extender="Enterprise Architect 2.5"/>\n`;
        eaCode += `</XMI>\n`;

        return eaCode;
    }
}