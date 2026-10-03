import { GalleryCategory, GalleryItem, MetricPod, DisposablePhoto } from './galleryTypes';

export const GALLERY_FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Memories (6,340)' },
  { id: 'lasers', label: 'Main Stage & Lasers (1,420)' },
  { id: 'sunset', label: 'Sunset Cove Vibes (890)' },
  { id: 'vinyl', label: 'Analog DJ Booths & Vinyl (640)' },
];

export const METRIC_PODS: MetricPod[] = [
  {
    id: 'm1',
    value: '4,820',
    label: 'RAW FESTIVAL PHOTOS',
    icon: 'photo_camera',
    bgPuck: '#b2f746',
    decorBg: 'rgba(163, 230, 53, 0.2)',
  },
  {
    id: 'm2',
    value: '128',
    label: 'RECAP TAPES & CUTS',
    icon: 'videocam',
    bgPuck: '#ffdbd0',
    decorBg: 'rgba(254, 106, 52, 0.2)',
  },
  {
    id: 'm3',
    value: '04',
    label: 'FOAM SANCTUARIES',
    icon: 'domain',
    bgPuck: '#ffd9e4',
    decorBg: 'rgba(255, 194, 215, 0.3)',
  },
  {
    id: 'm4',
    value: '1',
    label: 'SHARED HOUSE SOUL',
    icon: 'favorite',
    bgPuck: '#a3e635',
    decorBg: 'rgba(152, 218, 39, 0.3)',
  },
];

export const SPOTLIGHT_FILM = {
  title: 'A Sacred Pulse Under Lake Michigan Stars',
  description:
    'Captured over 72 uninterrupted hours across the Submerge Warehouse, The Concrete Temple, and Sunset Cove. Directed by Chicago underground lensman Marcus Thorne. Featuring direct master board audio lines from Derrick Carter, Honey Dijon, and local selectors.',
  directorName: 'Marcus Thorne Film',
  cameraSpec: 'Shot on Arri Alexa 35 & Bolex 16mm',
  runtime: '18:42 MIN',
  formatBadge: 'OFFICIAL 4K AFTERMOVIE',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC_6ers6ViP7GwzgKhHA0QVWfjLUVI43mm6yvYUwus7y91lB3d6lrCIabB-P651A97XyP_JXi1yGTW9Wm_UA5DbsP6q5JgTDgyGSjIgSKnMznei7xI2WnQ_AzlgC8slWdpX9XNprSucQTXIsw_QCKQCLFT4zJO8qZVyxTlb1tKCWhvYCC-Ke-CosShsCFAHN454z-ZlPREP5lM3Ha308b2eVHxL2vk2rhuZhCqg0ilcz1na5_t5CMUhzQ',
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'c1',
    category: 'lasers',
    stageBadge: 'SUBMERGE STAGE',
    timeTag: '03:14 AM • SAT',
    tag: 'PEAK ACID RITUAL',
    bpm: '128 BPM',
    dotColor: '#fe6a34',
    title: 'Submerge Acid Haze Ritual',
    subtitle:
      'Twin 40W turquoise laser cannons piercing the industrial concrete rafters during a 3-hour hypnotic live modular workout.',
    specIcon: 'lens',
    specName: 'KODAK VISION3 500T',
    specTag: 'ISO 1600',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATt6YtNyyeYwqZis_DczNkccF4LnJmiNfScPKS-m-3PsnMR1HtC4K0aUHqaywzZYYc_kxZpJ6Ez61rib72mOE25_WiQ1m3Z2bjSbEMVlcZ1kxWwdImSJadrHoDClEHcvcrHrtU0PkymwdSC_w-Mqx6JxD7iR003jc-dxqeTCSeZCE8ACkCmFn1ftX8Sepkuqmr71lkT_O1cRwCgh-U4b8xFh7IRR7ZtQO8hDP0N0WYJ4AmO8CcbkEvlQ',
  },
  {
    id: 'c2',
    category: 'vinyl',
    stageBadge: 'THE VINYL VAULT',
    timeTag: '06:40 PM • SUN',
    tag: 'PURE WAX ONLY',
    bpm: '122 BPM',
    dotColor: '#a3e635',
    title: 'Analog Rotary Sanctuary',
    subtitle:
      'Custom-built boutique 4-channel rotary mixer and dual Technics SL-1200MK7s playing original 1989 Trax Records test pressings.',
    specIcon: 'graphic_eq',
    specName: 'AUDIO-TECHNICA MC',
    specTag: 'ANALOG TAPE REC',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkLTKLSHfvpXZHG28lILk_oH1zGi2JxQzt257MVjve23uo4ggkyo8JjhS5JGVOS-0NDG51XrehpRDplnWYMmTJ5Qoan-wjLA4Ik5NkmfQQB4hqESd8zwHWckN1iED2vr5zJG1KT85_LoU2WYUZ5jrlvub_h2l5hozGuDEJgsU0ml7sz53HVhjs-ZE7qB1WkT6qorbluHLQQqLlyr2vMHaSNjqwvI8nwnLso38m3wHQonWp012Pyro5Eg',
  },
  {
    id: 'c3',
    category: 'sunset',
    stageBadge: 'SUNSET COVE',
    timeTag: '07:55 PM • FRI',
    tag: 'GOLDEN HOUR MAGIC',
    bpm: '124 BPM',
    dotColor: '#b4136d',
    title: 'Lakefront Sunset Groove',
    subtitle:
      'The pier flooded with warm amber rays as the Chicago skyline lit up behind the wooden sound sanctuary. Handclaps echoing across water.',
    specIcon: 'wb_twilight',
    specName: 'LEICA Q3 28MM',
    specTag: 'SUNSET DUST',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoR7oyoF1JMLTPEKyWK5biYht5cokX0-ajltL7YfYNA7kUGsJslgIHyHdEYJCdZDaWQvcSU9LIXsvxwsqa0QDdY91d_5HF9Rfsr1N7519CcoMh3KwLIj2UDHacWbmLQq9uKwrbMRlrtVnDrL6B1tkFeulpOmWjkVf6fbSzzoq9f-a_huRa2xZl6HwLnwTneUTwC61wnw0AbGzFW0UembguwVBKj4P6Mm5iNoC3UJMadMOPO-Hf7-8ohQ',
  },
];

export const DISPOSABLE_PHOTOS: DisposablePhoto[] = [
  {
    id: 'p1',
    code: '#014',
    alt: 'Candid authentic 35mm flash photo of young joyful ravers dancing and laughing under festival fairy lights',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATXcnj4sPnfUsc11-n4ojnqmObR4uVeix1neHjrYtPhXMdEszR12MMt6ex7l-1SWHRid2_5MRIuC1ziLRG43-9wlmGJh5ZPLm-TeZoaTW-YWG-4PosfCNDHlUZCuI1nQNgV_s3bsRyvvnBZyHgcGSQfOV_7lsWWDVWq5KRKFU9cnkpwwntuqQzYixV4bujAWc9l6aYbpYuDbdIyMWVFXOkfnx1nfF5AqZFdmyxDu2prkqqKnz7t2cR4Q',
  },
  {
    id: 'p2',
    code: '#089',
    alt: 'Analog 35mm grain photo of a DJ smiling warmly while pointing at the crowd from behind a booth',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDh9_uUkZbjTKvWIuIlWi-yy2OGxKzbiufWH6CLOf4AtySyUg41SSsqjJXdcENdTg_qvUqQYhGJFMdZKZU9bymbqZ0aPX7ARDrTWWeCYqhuustfkzkPBUW2ee2OP-mnyaTrMFJsPPgJ9FyyTewJUjhjdOlifhCaRBZYi35QiyUXaEkyWhanCi-tBhKMw_jmozP63GaJvMzGf2vDq-AH7l49DbWYTONkOF0WE9Bq7MRcgA-iBW25hcUYA',
  },
  {
    id: 'p3',
    code: '#142',
    alt: 'Abstract blurry motion flash photo of sneakers bouncing on high rebound foam dancefloor in warm light',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPomwLQSVVpGgxKAaieYxhDAXFMDuT5WcKMdb1tTBhUVVCtqq1bePRX3W4Dr4gLg0UDzWJl0ylrS_B6bqEK8VFQGvu-8QCHRi0K8HX3ap3IgzesPk-RaC1qhBTZz74Z8XBULXvjNSKcGIyj9H6tWabUbjdyxF7bbijAhrms3-jSMT_vapF7eQ74Kh6E8PDQ5eB65tsSS3rU50dAATTDgCY2xVkOwqqpXzz3oOr5ljxNseNs5DKdqNckA',
  },
];
