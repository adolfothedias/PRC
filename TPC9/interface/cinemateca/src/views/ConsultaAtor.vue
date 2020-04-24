<template>
  <ConsultaAtor :id="$route.params.idAtor"/>
</template>

<script>
// @ is an alias to /src
import ConsultaAtor from '@/components/ConsultaAtor.vue'

export default {
  name: 'Consulta Ator',
  components: {
    ConsultaAtor
  }
}
</script>
