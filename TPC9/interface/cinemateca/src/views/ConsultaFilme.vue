<template>
  <ConsultaFilme :id="$route.params.idFilme"/>
</template>

<script>
// @ is an alias to /src
import ConsultaFilme from '@/components/ConsultaFilme.vue'

export default {
  name: 'Consulta Filme',
  components: {
    ConsultaFilme
  }
}
</script>
