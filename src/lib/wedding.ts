import { couplePhoto } from '@/lib/assets';

/* Single source of truth for every piece of copy on the invitation. */

export const couple = {
  groom: { name: 'Bảo Trung', full: 'Trịnh Bảo Trung' },
  bride: { name: 'Thu Thảo', full: 'Nguyễn Thu Thảo' },
} as const;

export const ceremony = {
  weekday: 'Thứ Tư',
  time: '17 giờ 00 phút',
  dateLine: '28 . 10 . 2026',
  isoDate: '2026-10-28T17:00:00+07:00',
  lunar: 'Tức ngày 19 tháng 09 năm Bính Ngọ',
  hall: 'Crystal Ballroom — Tầng 6',
  venue: 'Khách sạn Lotte Hà Nội',
  address: '54 P. Liễu Giai, Giảng Võ, Hà Nội',
  mapUrl: 'https://maps.google.com/?q=Lotte+Hotel+Hanoi,+54+Lieu+Giai,+Ba+Dinh,+Ha+Noi',
} as const;

/** Photographs for the hero collage's two frames. Each frame falls back to
 *  lettering while null. */
export const photos: { portrait: string | null; candid: string | null } = {
  portrait: couplePhoto.portrait.src,
  candid: couplePhoto.garden.src,
};

/** Not shown on the card at the moment; kept so it can be put back. */
export const families = [
  { side: 'Nhà trai', father: 'Ông Trịnh Đình Hồng Phúc', mother: 'Bà Mai Mộc Lan' },
  { side: 'Nhà gái', father: 'Ông Nguyễn Đức Vinh', mother: 'Bà Nguyễn Thị Đôi' },
] as const;

export const agenda = [
  { time: '17:00', title: 'Đón khách', note: 'Quý khách nhận chỗ và chụp ảnh lưu niệm' },
  { time: '18:00', title: 'Lễ cưới', note: 'Nghi thức thành hôn tại Crystal Ballroom' },
  { time: '18:30', title: 'Tiệc tối', note: 'Khai tiệc cùng gia đình hai bên' },
  { time: '19:00', title: 'Tiệc sau lễ', note: 'Âm nhạc, nâng ly và chúc phúc' },
] as const;

export const dresscode = {
  /** Set under the title, the way "Elegant & Formal attire" is on the card. */
  headline: 'Thanh lịch & Trang trọng',
  /** The heading engraved on the held card, above the swatches. */
  paletteTitle: 'Bảng màu',
  note:
    'Để khung hình ngày cưới thật hoà hợp, kính mời quý khách lựa chọn trang phục theo bảng màu dưới đây.',
  swatches: [
    { name: 'Kem ngà', hex: '#F4EBDD' },
    { name: 'Be cát', hex: '#E0CFB4' },
    { name: 'Nâu đất', hex: '#9D8A6C' },
    { name: 'Xanh rêu', hex: '#4A7358' },
    { name: 'Rêu đậm', hex: '#133C2B' },
  ],
  avoid: 'Xin hạn chế sắc trắng tinh và đỏ rực.',
} as const;

export const rsvp = {
  eyebrow: 'Quý khách sẽ đến chứ?',
  deadline: 'Vui lòng phản hồi trước ngày 10 . 10 . 2026',
  note: 'Sự hiện diện của quý khách là niềm vinh hạnh lớn của gia đình chúng tôi.',
  maxGuests: 8,
} as const;

export const thanks = {
  lines: [
    'Cảm ơn quý khách đã dành thời gian',
    'đồng hành cùng chúng tôi trong ngày trọng đại.',
  ],
  sign: 'Rất hân hạnh được đón tiếp!',
} as const;
