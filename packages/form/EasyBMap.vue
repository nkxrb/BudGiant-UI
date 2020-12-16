<template>
  <baidu-map ref="bmap" class="easy-bmap" :center="center" @ready="ready" @dragend="dragend" :ak="ak">
    <bm-view class="map"></bm-view>
    <bm-local-search :panel="false" :keyword="searchWord" @searchcomplete="searchcomplete" @infohtmlset="infohtmlset" :auto-viewport="true" :select-first-result="true"
                     :location="location">
    </bm-local-search>
    <bm-marker :position="center" :icon="centerIcon" :offset="centerIconOffset" :zIndex="20000000"></bm-marker>
  </baidu-map>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmView from 'vue-baidu-map/components/map/MapView.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'
export default {
  name: 'easyBMap',
  components: { BaiduMap, BmView, BmMarker, BmLocalSearch },
  props: {
    ak: { type: String, default: 'oyZPEa8xhcLWZ9GE4pHagR2AzG3hCP0a' },
    location: { type: String, default: '中国' },
    searchWord: { type: String, default: '北京' },
    lat: { type: [Number, String] },
    lng: { type: [Number, String] }
  },
  data () {
    return {
      BMap: null,
      map: null,
      centerIconOffset: {
        width: 10,
        height: -3
      },
      centerIcon: {
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFnklEQVR4XuWbe4gVVRzHv9/ZXYnyD3vozl2FiijD6EFPUPun14JKmBE9ELLISkVn7pZFGbURlfTYO7slKibaH/YQivzDKKPHH7pERA9KhJTqD9k744oIWpi7O7+Yu3fztds5M3Nm7lgH7l/nd76/7/nMOWdmzplLNKBMXCXjxw1hwqBgQpNgwkAL/P4l3NMAK2DWSVsrcpNF3CrABQCm1n9njppXsIcWdkqIXkvww6CFH/e5DLL0mAmASZ60WsB8AvMEmJ6yAxsheNsv86uUOqM2NwtgrbSU/sRSIZZi+IobKwJ81BRidV8HtxkTBcxNgZIndwrwNICrTRo8WUuAtSHxer/D3SbypB4Bpdfk/LAZKwgsNGFIU6OfgpXVMrs048cMSwXA7pFpCLEZwGVpjSRpL4JtQZntSdqOtEkMoNGdP77TvsvE/UjU0O6RiRR8JoIr09A31law0S/zgSR6yQB0y3oIHkySMKs2QswNHG6Jqx8bgO3JYgCr4ibKI35wCFP3P8Zf4uSKBeC8ipSaLXwLQVucJLnFCrb6Zc6Jky8WALtbnoOgM06CBsS+6rt8QjevNoDCX/1jPT7QHOLivR08oANBG4DtyZMAVuqINjqGgvnVMjfp+NAG0OrJ9wSu0hFtdIwQmwKH83V8aAFoq8iMkNiuI1iQmAP+QZTQyaMqP1oASp68WH/RUekVp97CHH8Zt6oM6QHolnUieEglVqR6AV4KXK5QedICYHsSPWHdrhIrUr0A6wKXD6s86QL4GsANKrEi1UcbKIHLO1SedAH8CuBClViR6gXoDVzOUHnSBXAYwFkqsSLVC7A7cHmJypMugEMAxqvEilQvwMHA5dkqT7oAoj37i1RiBasf8F2OU3nSAtDqyQ6m395WeTFdH/gubZWoLoAPCShXVFWynOt3+S6nqXJqAbA9WQ3gUZVYkeoF2BG4nKnypAfg9NgHOKGvEuKpoIPKt1c9AMPb3ztVNItUT8E11TK/U3nSAhCJnE4LoQi2BGXOVXU+qtcGcJpsh9X6bIVo1z1D1AYQnek3HUUviMt1yDYqhsC7VZf36ebXBhAJ2l1yPyxs1BVvRJwF3NjnUnvzJhaA+lpQ2GcCAuurLmPtW8QGYFfkAhCf1L/0aMRFHivnXmnCrGApf4pjKjaA2lTollkQKLeb4hhJG5vb0diIUduT5QBeSWvcRHsCHVWXlSRaiUbAcRA2AFiQJLGxNsQbvsNlSfVSAZjSJecMWrX14LqkBlK1I7b6TryzwJPzpQIQibV5MjNEDULeO0a7ZACzg+X8LQ3E1ACi5CVPHhFgTRojMdv+JYJZQZlfxGx3SrgRAHUI3QIknotxOiLEwsDhW3HajBVrDAA2S5Pdh08B3GzC2JiGiZerDqPP8YwUcwAATPLkCmt4PSgZcXeqyPu+y3tMahsFEBlr9eRuAu+ZNFnTIr6xBjC773HuN6ltHEBkzvbkeQDPGjR6OCTa9znsNahZ52pasa5nexJ9QHmXCXkSi6oOM7nLZDICok5P7pEpQ2FtPUj7Feka3+UiEyBH08gMQJSsrUtuC4efFBPlic73wha09y9hdDSXSUlkLI6T1m5xKPDitKnHZjbvj/eSOYDanaEia0koz+pPMJbhvM8dwOQ35dyhwdo3RpdqjoRM533uAGq3xoosABG9PqvKHliY7i9jvyrQRH0uU2DEqO3JBwDm/atxwWK/zOgoLpeSL4AeuV5CbCfQMkbvPvdd3pJLz+tJcgVQWxA9eYHAM6N2kpjtO/z4Pw0gOmBpPortwlP+bLHBd5n7fxByHwH12+K9JN7550oLDomF6YHDn/O8+lGuhgCo3RU8ObahSnT6DqMXqNxL4wAMH7B8CeCPMw7i2t87eST33jdyBIw8G4jgSNBB8/sHmjQbNgI0/WUe9r8H8DfZXqpQkESZAAAAAABJRU5ErkJggg==',
        opts: {
          imageSize: {
            width: 30,
            height: 30
          }
        },
        size: {
          width: 50,
          height: 50
        }

      }
    }
  },
  computed: {
    center: {
      get: function () {
        return {
          lng: this.lng,
          lat: this.lat
        }
      },
      set: function (center) {
        this.$emit('update:lat', center.lat)
        this.$emit('update:lng', center.lng)
      }
    }
  },
  methods: {
    // 地图初始化完成时
    ready ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
    },
    dragend (e) {
      if (this.map) {
        const center = this.map.getCenter()
        this.setCenter(center)
      }
    },
    setCenter (point) {
      this.$emit('update:lat', point.lat)
      this.$emit('update:lng', point.lng)
    },
    searchcomplete (e) {
    },
    infohtmlset (e) {
      if (e && e.point) {
        this.setCenter(e.point)
        this.$emit('update:location', e.city)
      }
    }
  },
  watch: {
    center: function (newV) {
      // debugger
    }
  }
}
</script>
<style scoped>
  .easy-bmap {
    height: 100%;
    min-height: 300px;
    width: 100%;
    margin: 0 auto;
  }
  .easy-bmap .map {
    height: 100%;
    min-height: 300px;
    width: 100%;
  }
</style>
