export class Now {
    constructor() {
        // this.spotify();
        this.fasting();
    }

    fasting() {
        var d = new Date();
        var offset = 1;
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*offset));
        var currentTime = nd.getHours();
        let fastingOutput = document.querySelector('[data-now="fasting"]');
        
        if (!fastingOutput)
            return;

        if (currentTime >= 12 && currentTime <= 19) {
            fastingOutput.textContent = 'eating';
        } else {
            fastingOutput.textContent = 'fasting';
        }
    }

    spotify() {
        let token = '';

        fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let track = {
                name: 'nothing',
                url: '#'
            };

            if (data.is_playing) {
                let song = data.item.name;
                let artists = data.item.artists.map(a => a.name).join(' & ');
                track.name = song + ' by ' + artists;
                track.url = data.item.external_urls.spotify;
            }
            
            let spotifyOutput = document.querySelector('[data-now="spotify"]');
            if (spotifyOutput) {
                spotifyOutput.href = track.url;
                spotifyOutput.textContent = track.name;
            }
        });

        // fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data.items);
        //     let song = data.items[0].track;
        //     let artists = song.artists.map(a => a.name).join(' & ');
        //     let spotifyOutput = document.querySelector('.now__spotify');

        //     if (spotifyOutput) {
        //         spotifyOutput.href = song.external_urls.spotify;
        //         spotifyOutput.textContent = song.name + ' by ' + artists;
        //     }
        // });
    }
}