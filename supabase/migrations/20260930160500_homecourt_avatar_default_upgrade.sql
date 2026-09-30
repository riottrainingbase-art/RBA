update public.homecourt_player_customization
set
  hair_style='spiky',
  hair_color='dark-brown',
  jersey_number=23,
  updated_at=now()
where hair_style='short'
  and hair_color='black'
  and jersey_style='rba-black'
  and shorts_style='match'
  and shoe_style='basic'
  and accessory='none'
  and jersey_number=0
  and court_theme='base';
