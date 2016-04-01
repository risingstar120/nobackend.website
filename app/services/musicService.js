class MusicService {
  constructor($http, configService) {
    'ngInject';

    this.$http = $http;
    this.configService = configService;
  }

  getPlayList(id) {
    return this.$http.jsonp(this._url('playlist',id), {
      cache: true
    })
  }

  getMusic(ids) {
    return this.$http.jsonp(this._url('songlist',ids), {
      cache: true
    })
  }

  getAlbum(id) {
    return this.$http.jsonp(this._url('album',id), {
      cache: true
    })
  }

  _url(type, id) {
    var music = this.configService.service('music');
    return `${music.endpoint}/?p=${music.provider}&t=${type}&i=${id}&c=JSON_CALLBACK`
  }
}

export default MusicService;