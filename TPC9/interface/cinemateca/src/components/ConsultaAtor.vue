<template>
  <div>
    <v-alert type="warning" v-if="!ator">
      A carregar...
    </v-alert>
    <v-card class="ma-4" v-else>
      <v-card-title class="indigo darken-4 white--text" dark>
        <span class="headline">Ator: "{{ ator.info.nome }}" ({{id}})</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="2">
            <div class="info-label">Nome</div>
          </v-col>
          <v-col>
            <div class="info-content">{{ ator.info.nome }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <div class="info-label">Sexo</div>
          </v-col>
          <v-col>
            <div class="info-content">{{ ator.info.sexo == 'M' ? 'Masculino' : 'Feminino'}}</div>
          </v-col>
        </v-row>
        

        <v-row v-if="ator.personagens && ator.personagens.length > 0">
          <v-col cols="2">
            <div class="info-label">Personagens</div>
          </v-col>
          <v-col>
            <div class="info-content">
              <ul>
                <li v-for="(item,i) in ator.personagens" :key="ator.personagens[i].idPersonagem">
                  <a href="">{{item.pnome}}</a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="ator.filmes && ator.filmes.length > 0">
          <v-col cols="2">
            <div class="info-label">Filmes</div>
          </v-col>
          <v-col>
            <div class="info-content">
              <ul>
                <li v-for="(item,i) in ator.filmes" :key="ator.filmes[i].idFilme">
                  <a v-bind:href="host + '/filmes/' + item.idFilme" >{{item.titulo}}</a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

export default {
  props:["id"],
  
  name: 'ConsultaAtor',

  data: () => ({
    ator : {},
    host : ""
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/atores/" + this.id);
      this.ator = response.data
      this.ator.filmes.sort((a,b) => a.titulo > b.titulo ? 1 : -1);
      this.ator.personagens.sort((a,b) => a.pnome > b.pnome ? 1 : -1);
      this.host = this.$route.split('/')[0]
    } 
    catch (e) {
      return e;
    }
  }
  
}
</script>

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