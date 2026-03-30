import * as l from './node_modules/lucide-react/dist/lucide-react.js';

const check = [
  // Travel
  'Plane','PlaneLanding','PlaneTakeoff','Train','Bus','Car','Bike','Ship','Anchor',
  'Compass','Map','MapPin','MapPinned','Navigation','Navigation2','Route','Globe','Globe2',
  'Luggage','Backpack','Ticket','TicketCheck','Hotel','Milestone','Mountain','MountainSnow',
  'Tent','TreePine','Palmtree','Sailboat','Cable','CableCar','FerrisWheel','Landmark',
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
  'BadgeDollarSign','CircleDollarSign','Landmark','Building','Building2',
  // Innovation
  'Lightbulb','LightbulbOff','Sparkles','Zap','Rocket','FlaskConical','FlaskRound',
  'Microscope','Atom','Dna','BrainCircuit','Brain','Bot','Cpu','CircuitBoard',
  'Wand2','Stars','Telescope','Satellite','Antenna','Radio','Wifi','QrCode',
  'Fingerprint','ScanFace','Eye','Layers','Layers2','Box','Hexagon',
  // Social
  'Heart','HeartHandshake','Handshake','Users','Users2','UserPlus','Share','Share2',
  'MessageCircle','MessageSquare','ThumbsUp','ThumbsDown','Smile','Laugh','Frown',
  'Meh','PartyPopper','Gift','Star','Trophy','Award','Medal','Crown','Flag',
  'AtSign','Hash','Globe','Rss','Bell','BellRing',
  // Future
  'Orbit','Infinity','Hourglass','Timer','Clock','Layers','Box','Diamond','Gem',
  'Hexagon','Pentagon','Triangle','Sparkles','Stars','Wand2','Cpu','BrainCircuit',
  'Network','Workflow','Satellite','Telescope','Atom','Dna','Rocket','Zap',
  'CircuitBoard','Bot','Eye','ScanLine','Scan','NfcIcon','Nfc',
  // Sport
  'Dumbbell','Bike','PersonStanding','Footprints','Activity','HeartPulse','Timer',
  'Stopwatch','Trophy','Medal','Award','Target','Crosshair','Swords','Shield',
  'ShieldCheck','Flag','Wind','Waves','Mountain','Flame','Zap','Battery',
  'BatteryFull','BatteryCharging','Bike','PersonStanding','Volleyball','Football',
  'Baseball','Basketball','Tennis','Sword','Axe','Anchor','Skiing','Snowflake',
  // Lifestyle
  'Music','Music2','Music3','Music4','Headphones','Film','Camera','Clapperboard',
  'BookOpen','Book','BookMarked','Newspaper','Rss','Palette','Paintbrush','Pen',
  'Pencil','Scissors','Shirt','ShoppingBag','ShoppingCart','Watch','Glasses',
  'Coffee','Wine','Leaf','Sun','Moon','Star','Sunset','Sunrise','Tv','Radio',
  'Gamepad','Gamepad2','Joystick','Dice1','Dice5','Puzzle','Cat','Dog','Bird',
  'Fish','Flower','Flower2','Bike','Mountain','Tent','Flame','Heart',
];

const missing = check.filter(n => !(n in l));
const ok = check.filter(n => n in l);
const unique_ok = [...new Set(ok)];
const unique_missing = [...new Set(missing)];
console.log('AVAILABLE:', unique_ok.length);
console.log('MISSING:', unique_missing.join(', '));
