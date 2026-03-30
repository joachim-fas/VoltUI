const l = require('./node_modules/lucide-react/dist/cjs/lucide-react.js');

const check = [
  // Travel
  'Plane','PlaneLanding','PlaneTakeoff','Train','Bus','Car','Bike','Ship','Anchor',
  'Compass','Map','MapPin','MapPinned','Navigation','Navigation2','Route','Globe','Globe2',
  'Luggage','Backpack','Ticket','TicketCheck','Milestone','Mountain','MountainSnow',
  'Tent','TreePine','Palmtree','Sailboat','CableCar','FerrisWheel','Landmark',
  // Hospitality
  'UtensilsCrossed','Utensils','ChefHat','Coffee','CupSoda','Wine','Beer','Pizza',
  'Sandwich','Salad','Apple','Croissant','IceCream','IceCream2','Cake','Cookie',
  'Soup','Beef','Egg','Milk','Carrot','Banana','Cherry','Grape','Citrus','Nut','Wheat',
  'BedDouble','BedSingle','Bath','Shower','Sofa','Lamp','Armchair','Tv',
  'Microwave','Refrigerator','WashingMachine','Waves','ConciergeBell','BellConcierge',
  // Finance
  'DollarSign','Euro','PoundSterling','JapaneseYen','IndianRupee','Bitcoin','Coins',
  'Banknote','CreditCard','Wallet','PiggyBank','TrendingUp','TrendingDown',
  'BarChart','BarChart2','LineChart','PieChart','Receipt','ReceiptText',
  'Scale','Percent','Calculator','ArrowUpDown','HandCoins','Vault',
  'BadgeDollarSign','CircleDollarSign','Building','Building2',
  // Innovation
  'Lightbulb','LightbulbOff','Sparkles','Zap','Rocket','FlaskConical','FlaskRound',
  'Microscope','Atom','Dna','BrainCircuit','Brain','Bot','Cpu','CircuitBoard',
  'Wand2','Stars','Telescope','Satellite','Antenna','Radio','Wifi','QrCode',
  'Fingerprint','ScanFace','Eye','Layers','Layers2','Box','Hexagon',
  // Social
  'Heart','HeartHandshake','Handshake','Users','Users2','UserPlus','Share','Share2',
  'MessageCircle','MessageSquare','ThumbsUp','ThumbsDown','Smile','Laugh','Frown',
  'Meh','PartyPopper','Gift','Star','Trophy','Award','Medal','Crown','Flag',
  'AtSign','Hash','Rss','Bell','BellRing',
  // Future
  'Orbit','Infinity','Hourglass','Timer','Clock','Diamond','Gem',
  'Hexagon','Pentagon','Triangle','Network','Workflow','ScanLine','Scan','Nfc',
  // Sport
  'Dumbbell','Bike','PersonStanding','Footprints','Activity','HeartPulse','Timer',
  'Stopwatch','Trophy','Medal','Award','Target','Crosshair','Swords','Shield',
  'ShieldCheck','Wind','Flame','Battery','BatteryFull','BatteryCharging',
  'Volleyball','Football','Baseball','Basketball','Sword','Axe','Skiing','Snowflake',
  // Lifestyle
  'Music','Music2','Music3','Music4','Headphones','Film','Camera','Clapperboard',
  'BookOpen','Book','BookMarked','Newspaper','Palette','Paintbrush','Pen',
  'Pencil','Scissors','Shirt','ShoppingBag','ShoppingCart','Watch','Glasses',
  'Gamepad','Gamepad2','Joystick','Dice1','Dice5','Puzzle','Cat','Dog','Bird',
  'Fish','Flower','Flower2','Leaf','Sun','Moon','Sunset','Sunrise',
];

const uniq = [...new Set(check)];
const missing = uniq.filter(n => !(n in l));
const ok = uniq.filter(n => n in l);
console.log('AVAILABLE (' + ok.length + '):', ok.join(', '));
console.log('');
console.log('MISSING (' + missing.length + '):', missing.join(', '));
