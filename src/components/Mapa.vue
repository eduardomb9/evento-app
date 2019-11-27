<style scoped>
  #mapa { height: 280px; }
</style>

<template>
    <div>
        {{ coordenadas2[0] }} , {{ coordenadas2[1] }}
        <div id="mapa"></div>
        <v-btn @click="alterarCoordenadas([])">LIMPAR MAPA DE MARCADORES</v-btn>
    </div>
</template>

<script>
export default {
    props: {
        coordenadasEdit: Array
    },
    computed: {
        coordenadas2: { 
            get: function () {
                return this.coordenadasEdit
            },
            set: function(val) {
                this.layerGroup.clearLayers()
                if (this.val) {
                    this.val = []
                }

                if (val.length > 0) {
                    this.coordenadasEdit.push(val[0])
                    this.coordenadasEdit.push(val[1])
                    var marcador = L.marker(this.coordenadasEdit).addTo(this.layerGroup)
                }
                // var marcador = L.marker(this.coordenadasEdit).addTo(this.layerGroup)
            }
        }
    },
    data: function () {
        return {
            coordenadas: [],
            mapa: [],
            layerGroup: []
        }
    },
    methods: {
        onMapClick: function (e) {
            this.layerGroup.clearLayers()
            if (this.coordenadas) {
                this.coordenadas = []
            }

            this.coordenadas.push(e.latlng.lat)
            this.coordenadas.push(e.latlng.lng)

            var marcador = L.marker(this.coordenadas).addTo(this.layerGroup)
            this.alterarCoordenadas(this.coordenadas)
        },
        alterarCoordenadas: function(coordenadas) {
            this.layerGroup.clearLayers()
            if (coordenadas.length > 0) {
                L.marker(coordenadas).addTo(this.layerGroup)
            }
            this.$emit('alterar-coordenadas', coordenadas)
        },
    },
    mounted () {
        this.mapa = L.map('mapa').fitWorld();
        this.mapa.locate({setView: true, maxZoom: 16})

        this.mapa.on('click', this.onMapClick)

        this.layerGroup = L.layerGroup().addTo(this.mapa)

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFyYW5oYW9lZHUiLCJhIjoiY2szZXE5bWJ1MDB3ejNucnUwN2JsNXBiZiJ9.gyB6TW6Q0qGZ54njdGoiCA'
        }).addTo(this.mapa)
    }
}
</script>