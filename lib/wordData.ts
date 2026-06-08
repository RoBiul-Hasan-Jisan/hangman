export interface CategoryInfo {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export type CategoryKey = 'animals' | 'food' | 'sports' | 'countries' | 'technology' | 'nature';

export const CATEGORY_INFO: Record<CategoryKey, CategoryInfo> = {
  animals: {
    name: "Animals",
    icon: "🐘",
    color: "#27ae60",
    description: "Guess the animal names!"
  },
  food: {
    name: "Food & Drinks",
    icon: "🍕",
    color: "#e67e22",
    description: "Delicious food vocabulary!"
  },
  sports: {
    name: "Sports",
    icon: "⚽",
    color: "#3498db",
    description: "Sports and activities!"
  },
  countries: {
    name: "Countries",
    icon: "🌍",
    color: "#9b59b6",
    description: "Countries around the world!"
  },
  technology: {
    name: "Technology",
    icon: "💻",
    color: "#1abc9c",
    description: "Tech and computer terms!"
  },
  nature: {
    name: "Nature",
    icon: "🌿",
    color: "#2ecc71",
    description: "Natural wonders!"
  }
};

export const WORDS_DATABASE: Record<CategoryKey, string[]> = {
  animals: [
    "ELEPHANT", "GIRAFFE", "KANGAROO", "DOLPHIN", "PENGUIN",
    "CROCODILE", "BUTTERFLY", "SCORPION", "FLAMINGO", "CHAMELEON",
    "RHINOCEROS", "HIPPOPOTAMUS", "ALLIGATOR", "CHEETAH", "LEOPARD",
    "ZEBRA", "GORILLA", "CHIMPANZEE", "ORANGUTAN", "KOALA",
    "PANDA", "POLARBEAR", "OCTOPUS", "JELLYFISH", "STARFISH",
    "PLATYPUS", "ARMADILLO", "PORCUPINE", "HEDGEHOG", "MEERKAT",
    "WOMBAT", "TASMANIANDEVIL", "CAPYBARA", "LLAMA", "ALPACA",
    "FERRET", "OTTER", "BEAVER", "RACCOON", "SKUNK",
    "POSSUM", "SLOTH", "ANTEATER", "TAPIR", "OKAPI",
    "WALRUS", "SEALION", "MANATEE", "PUFFERFISH", "SEAHORSE",
  ],
  food: [
    "PIZZA", "BURGER", "SUSHI", "PASTA", "TACO",
    "BURRITO", "LASAGNA", "RISOTTO", "RAMEN", "DIMSUM",
    "CHOCOLATE", "VANILLA", "STRAWBERRY", "PANCAKE", "WAFFLE",
    "BROWNIE", "CHEESECAKE", "CROISSANT", "BAGUETTE", "BRIOCHE",
    "SALMON", "LOBSTER", "OYSTER", "MUSSEL", "SCALLOP",
    "GUACAMOLE", "HUMUS", "FALAFEL", "KEBAB", "GYROS",
    "PAELLA", "GNOCCHI", "FETTUCCINE", "RAVIOLI", "CANNOLI",
    "MACARON", "ECLAIR", "CREPE", "SCONE", "MUFFIN",
    "CUPCAKE", "DONUT", "PRETZEL", "POPCORN", "NACHOS",
    "BAGEL", "CREAMCHEESE", "LOX", "QUICHE", "OMELETTE",
  ],
  sports: [
    "FOOTBALL", "BASKETBALL", "BASEBALL", "TENNIS", "CRICKET",
    "HOCKEY", "VOLLEYBALL", "BADMINTON", "TABLETENNIS", "GOLF",
    "SWIMMING", "BOXING", "WRESTLING", "JUDO", "KARATE",
    "SKATING", "SNOWBOARD", "SKIING", "SURFING", "CLIMBING",
    "MARATHON", "SPRINT", "RELAY", "GYMNASTICS", "ARCHERY",
    "RUGBY", "LACROSSE", "HANDBALL", "SQUASH", "RACQUETBALL",
    "PICKLEBALL", "CURLING", "BOBSLED", "LUGE", "BIATHLON",
    "TRIATHLON", "PENTATHLON", "FENCING", "TAEKWONDO", "AIKIDO",
    "KICKBOXING", "MUAYTHAI", "BOULDERING", "PILATES", "SOCCER",
    "SKATEBOARDING", "ROLLERSKATING", "BOWLING", "DARTS", "BILLIARDS",
  ],
  countries: [
    "AUSTRALIA", "INDONESIA", "PAKISTAN", "PHILIPPINES", "NETHERLANDS",
    "SWITZERLAND", "ARGENTINA", "VENEZUELA", "NIGERIA", "MADAGASCAR",
    "BANGLADESH", "THAILAND", "VIETNAM", "MALAYSIA", "SINGAPORE",
    "NORWAY", "SWEDEN", "FINLAND", "DENMARK", "ICELAND",
    "BRAZIL", "CHILE", "PERU", "COLOMBIA", "ECUADOR",
    "KAZAKHSTAN", "UZBEKISTAN", "AZERBAIJAN", "ARMENIA", "GEORGIA",
    "MOLDOVA", "BELARUS", "BULGARIA", "HUNGARY", "ROMANIA",
    "SLOVAKIA", "SLOVENIA", "CROATIA", "SERBIA", "ALBANIA",
    "CANADA", "MEXICO", "PANAMA", "COSTARICA", "GUATEMALA",
    "EGYPT", "SOUTHAFRICA", "MOROCCO", "TUNISIA", "ALGERIA",
    "ETHIOPIA", "KENYA", "TANZANIA", "UGANDA", "GHANA",
    "GERMANY", "FRANCE", "ITALY", "SPAIN", "PORTUGAL",
    "BELGIUM", "AUSTRIA", "POLAND", "CZECHIA", "ESTONIA",
    "RUSSIA", "UKRAINE", "TURKEY", "ISRAEL", "GREECE",
    "INDIA", "CHINA", "JAPAN", "SOUTHKOREA", "MONGOLIA",
  ],
  technology: [
    "COMPUTER", "KEYBOARD", "MONITOR", "PROCESSOR", "SOFTWARE",
    "ALGORITHM", "DATABASE", "NETWORK", "INTERNET", "CYBERSECURITY",
    "JAVASCRIPT", "PYTHON", "JAVA", "RUBY", "SWIFT",
    "DEVELOPER", "PROGRAMMING", "APPLICATION", "WEBSITE", "ROBOTICS",
    "ARTIFICIAL", "MACHINE", "CLOUD", "BLOCKCHAIN", "TYPESCRIPT",
    "REACT", "ANGULAR", "VUE", "NODEJS", "DOCKER",
    "KUBERNETES", "GITHUB", "GITLAB", "LINUX", "WINDOWS",
    "ANDROID", "FIREBASE", "AWS", "AZURE", "API",
    "SERVER", "CLIENT", "HTML", "CSS", "SQL",
    "MONGODB", "POSTGRES", "REDIS", "FRAMEWORK", "LIBRARY",
  ],
  nature: [
    "MOUNTAIN", "VOLCANO", "HURRICANE", "EARTHQUAKE", "THUNDER",
    "LIGHTNING", "RAINBOW", "ATMOSPHERE", "ECOSYSTEM", "FOREST",
    "JUNGLE", "DESERT", "OCEAN", "RIVER", "WATERFALL",
    "GLACIER", "CAVE", "ISLAND", "FLOWER", "TREE",
    "GRASS", "LEAF", "PETAL", "AURORA", "METEOR",
    "COMET", "ASTEROID", "ECLIPSE", "MONSOON", "TORNADO",
    "TSUNAMI", "WILDFIRE", "DROUGHT", "FLOOD", "GEYSER",
    "CANYON", "PLATEAU", "PRAIRIE", "SAVANNA", "TUNDRA",
    "RAINFOREST", "SWAMP", "MARSH", "REEF", "LAGOON",
    "STREAM", "CREEK", "BROOK", "POND", "LAKE",
  ]
};
