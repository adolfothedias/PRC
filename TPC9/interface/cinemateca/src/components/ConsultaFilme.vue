<template>
  <div>
    <v-alert type="warning" v-if="!filme">
      A carregar...
    </v-alert>
    <v-card class="ma-4" v-else>
      <v-card-title class="indigo darken-4 white--text" dark>
        <span class="headline">Filme: "{{ filme.info.titulo }}" ({{id}})</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="2">
            <div class="info-label">Resumo</div>
          </v-col>
          <v-col>
            <div class="info-content">{{ filme.info.res }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <div class="info-label">Data</div>
          </v-col>
          <v-col>
            <div class="info-content">{{ filme.info.data }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <div class="info-label">Duração (minutos)</div>
          </v-col>
          <v-col>
            <div class="info-content">{{ filme.info.duracao }}</div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <div class="info-label">Índice de Popularidade</div>
          </v-col>
          <v-col>
            <div class="info-content">{{ filme.info.pop }}</div>
          </v-col>
        </v-row>

        <v-row v-if="filme.atores && filme.atores.length > 0">
          <v-col cols="2">
            <div class="info-label">Atores</div>
          </v-col>
          <v-col>
            <div class="info-content">
              <ul>
                <li v-for="(item,i) in filme.atores" :key="filme.atores[i].idAtor">
                  <a :href="host + '/atores/' + item.idAtor">{{item.anome}}</a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="filme.generos && filme.generos.length > 0">
          <v-col cols="2">
            <div class="info-label">Géneros</div>
          </v-col>
          <v-col>
            <div class="info-content">
              <ul>
                <li v-for="(item,i) in filme.generos" :key="filme.generos[i].idGenero">
                  <a href="#">{{item.gnome}}</a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="filme.personagens && filme.personagens.length > 0">
          <v-col cols="2">
            <div class="info-label">Personagens</div>
          </v-col>
          <v-col>
            <div class="info-content">
              <ul>
                <li v-for="(item,i) in filme.personagens" :key="filme.personagens[i].idPersonagem">
                  <a href="">{{item.pnome}}</a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="filme.linguas && filme.linguas.length > 0">
          <v-col cols="2">
            <div class="info-label">Línguas</div>
          </v-col>
          <v-col>
            <div class="info-content">
              <ul>
                <li v-for="(item,i) in filme.linguas" :key="filme.linguas[i].l">
                  <a href="">{{item.l}}</a>
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
  
  name: 'ConsultaFilme',

  data: () => ({
    filme : {},
    host : ""
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/filmes/" + this.id);
      this.filme = response.data
      this.filme.atores.sort((a,b) => a.anome > b.anome ? 1 : -1);
      this.filme.generos.sort((a,b) => a.gnome > b.gnome ? 1 : -1);
      this.filme.personagens.sort((a,b) => a.pnome > b.pnome ? 1 : -1);
      this.filme.linguas.sort((a,b) => a.l > b.l ? 1 : -1);
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