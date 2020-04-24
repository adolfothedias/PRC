<template>
  <v-card class="ma-2">
    <v-card-title class="indigo darken-4 white--text" dark> Bem Vindo à Cinemateca </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="2">
          <v-btn icon href="/filmes" > Filmes </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn icon href="/atores" > Atores </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>
