export interface Position {
    latitude: number
    longitude: number
}

export default class GeoLocation {
    static getLocation(): Promise<Position | null> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((it) => {
                    resolve({
                        latitude: it.coords.latitude,
                        longitude: it.coords.longitude,
                    })
                }, () => {
                    resolve(null)
                });
              } else {
                resolve(null)
              }
        })
    }
}