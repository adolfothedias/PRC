<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
<xsl:output method="text" omit-xml-declaration="yes" indent="yes"/>

    <xsl:template match="turma">
        <xsl:for-each select="docentes/docente">
            <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#]]></xsl:text>
            <xsl:value-of select="@id"/>
            <xsl:text disable-output-escaping="yes"><![CDATA[>rdf:type owl:NamedIndividual ;]]></xsl:text>
            
            <xsl:text>&#xa;</xsl:text>
            
            <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#lecciona> <http://www.semanticweb.org/carlos/ontologies/2020/salaAula#]]></xsl:text>
            <xsl:value-of select="cadeira"/> 
            <xsl:text disable-output-escaping="yes"><![CDATA[> ;]]></xsl:text>
                
            <xsl:text>&#xa;</xsl:text>
            
            <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#curso> "]]></xsl:text>
            <xsl:value-of select="../../@curso"/> 
            <xsl:text disable-output-escaping="yes"><![CDATA["^^xsd:string ;]]></xsl:text>
            
            <xsl:text>&#xa;</xsl:text>
            
            <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#email> "]]></xsl:text>
            <xsl:value-of select="email"/>
            <xsl:text disable-output-escaping="yes"><![CDATA[@mail.com"^^xsd:string ;]]></xsl:text>
            
            <xsl:text>&#xa;</xsl:text>
            
            <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#nome> "]]></xsl:text>
            <xsl:value-of select="nome"/>
            <xsl:text disable-output-escaping="yes"><![CDATA["^^xsd:string .]]></xsl:text>
            
            <xsl:text>&#xa;</xsl:text>
        </xsl:for-each>
        
        
        <xsl:for-each select="aluno">
            
                <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#]]></xsl:text>
                <xsl:value-of select="numero"/>
                <xsl:text disable-output-escaping="yes"><![CDATA[>rdf:type owl:NamedIndividual ;]]></xsl:text>
                
                <xsl:text>&#xa;</xsl:text>
            
                <xsl:for-each select="cadeiras/cadeira">
                    
                    <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#frequenta> <http://www.semanticweb.org/carlos/ontologies/2020/salaAula#]]></xsl:text>
                    <xsl:value-of select="."/> 
                    <xsl:text disable-output-escaping="yes"><![CDATA[> ;]]></xsl:text>
                    
                    <xsl:text>&#xa;</xsl:text>
                </xsl:for-each>
            
                <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#curso> "]]></xsl:text>
                <xsl:value-of select="../@curso"/> 
                <xsl:text disable-output-escaping="yes"><![CDATA["^^xsd:string ;]]></xsl:text>
                
                <xsl:text>&#xa;</xsl:text>
            
                <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#email> "]]></xsl:text>
                <xsl:value-of select="numero"/>
                <xsl:text disable-output-escaping="yes"><![CDATA[@mail.com"^^xsd:string ;]]></xsl:text>
                
                <xsl:text>&#xa;</xsl:text>
            
                <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#ident> "]]></xsl:text>
                <xsl:value-of select="numero"/>
                <xsl:text disable-output-escaping="yes"><![CDATA["^^xsd:string ;]]></xsl:text>
                
                <xsl:text>&#xa;</xsl:text>
            
                <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#nome> "]]></xsl:text>
                <xsl:value-of select="nome"/>
                <xsl:text disable-output-escaping="yes"><![CDATA["^^xsd:string .]]></xsl:text>
            
                <xsl:text>&#xa;</xsl:text>
        </xsl:for-each>
        
        
        <xsl:for-each select="cadeiras/cadeira">
            
            <xsl:text disable-output-escaping="yes"><![CDATA[<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#]]></xsl:text>
            <xsl:value-of select="."/>
            <xsl:text disable-output-escaping="yes"><![CDATA[> rdf:type owl:NamedIndividual ,<http://www.semanticweb.org/carlos/ontologies/2020/salaAula#UC> .]]></xsl:text>
            
            <xsl:text>&#xa;</xsl:text>
        </xsl:for-each>
        
        
        
        
    
</xsl:template>
    
    
</xsl:stylesheet>