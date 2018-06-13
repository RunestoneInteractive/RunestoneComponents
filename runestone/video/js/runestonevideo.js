function onPlayerStateChange(event) {
    let rb = new RunestoneBase();
    let videoTime = event.target.getCurrentTime();
    let data = {
        'event': 'video',
        'div_id': event.target.getIframe().id
    }
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("playing " + event.target.getIframe().id );
        data.act = 'play:' + videoTime;
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log("ended " + event.target.getIframe().id);
        data.act = 'complete';
    } else if (event.data == YT.PlayerState.PAUSED) {
        console.log("paused at " + videoTime );
        data.act = 'pause:' + videoTime;
    }
    rb.logBookEvent(data);
  }