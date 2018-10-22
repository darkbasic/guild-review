import * as localtunnel from 'localtunnel';

let tunnel;

export async function createLocalTunnel(port: number, subdomain: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    tunnel = localtunnel(port, { subdomain }, (err, { url }) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
    tunnel.on('error', async () => tunnel = await createLocalTunnel(port, subdomain));
  });
}
