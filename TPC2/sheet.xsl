<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    
    <xsl:output method="text"/>
    
    <xsl:template match="/">
        <xsl:apply-templates mode="e1"/>
    </xsl:template>
    
    
    
    <xsl:template match="obra" mode="e1">
        :<xsl:value-of select="@id" /> rdf:type owl:NamedIndividual ,
        :obra ;
        :compositor "<xsl:value-of select="compositor" />"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo" />"^^xsd:string ;
        :titulo "<xsl:value-of select="titulo" />"^^xsd:string.
        <xsl:apply-templates select="instrumentos" mode="e2" />
    </xsl:template>
    
    <xsl:strip-space elements="designaca"/>
    
    <xsl:template match="instrumento" mode="e2">
        :<xsl:value-of select="../../@id" />-<xsl:value-of select="translate(designacao,' ','')" /><xsl:value-of select="partitura/@voz" /> rdf:type owl:NamedIndividual ,
        :instrumento ;
        :utilizado-em :<xsl:value-of select="../../@id" /> ;
        :designacao "<xsl:value-of select="translate(designacao,' ','')" />"^^xsd:string ;
        :pasta-partitura "<xsl:value-of select="partitura/@path" />"^^xsd:string ;
        :tipo-partitura "<xsl:value-of select="partitura/@type" />"^^xsd:string .
    </xsl:template>
   
    
    
</xsl:stylesheet>