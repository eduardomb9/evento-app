<style scoped>
  #mapa {
    height: 280px;
  }
</style>

<template>
    <div class="container">
        <div id="mapa"></div>
    </div>
</template>

<script>
export default {
    props: {
        coordenadasEdit: Array
    },
    computed: {
        coordenadas: { 
            get: function () {
                return this.coordenadasEdit
            },
            set: function(val) {
                this.alterarCoordenadas(val)
            }
        }
    },
    watch: {
        coordenadasEdit: function () {
            if (this.marker) {
                this.mapa.removeLayer(this.marker)
            }
            if (this.coordenadas.length == 2) {
                if (this.coordenadas[0] != 0.0 && this.coordenadas[1] != 0.0) {
                    this.marker = L.marker(this.coordenadas).addTo(this.mapa)
                }
            }
        }
    },
    data: function () {
        return {
            mapa: [],
            layerGroup: [],
            marker: []
        }
    },
    methods: {
        onMapClick: function (e) {
            this.alterarCoordenadas([e.latlng.lat, e.latlng.lng])
        },
        alterarCoordenadas: function(coords) {
            // rever alterar coordenada valor nao nulo
            this.$emit('alterar-coordenadas', coords)
            if (this.marker) {
                this.mapa.removeLayer(this.marker)
            }
            if (this.coordenadas.length == 2) {
                if (this.coordenadas[0] != 0.0 && this.coordenadas[1] != 0.0) {
                    this.marker = L.marker(this.coordenadas).addTo(this.mapa)
                }
            }
        },
    },
    mounted () {
        this.mapa = L.map('mapa').fitWorld();
        this.mapa.locate({setView: true, maxZoom: 10})

        this.mapa.on('click', this.onMapClick)

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFyYW5oYW9lZHUiLCJhIjoiY2szZXE5bWJ1MDB3ejNucnUwN2JsNXBiZiJ9.gyB6TW6Q0qGZ54njdGoiCA'
        }).addTo(this.mapa)
    }
}
</script>
