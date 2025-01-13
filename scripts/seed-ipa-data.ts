const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
var admin = require("firebase-admin");

var serviceAccount = require("./collabr-1f6e5-firebase-adminsdk-8tjq2-79f803ac97.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// License template helper function
const createLicenseData = (type: string) => {
  const baseData = {
    commercialAttribution: true,
    commercialRevCelling: "1000000",
    commercialRevShare: "0.1",
    commercialUse: false,
    commercializerChecker: "",
    commercializerCheckerData: "",
    currency: "ETH",
    defaultMintingFee: "0.1",
    derivativeRevCelling: "500000",
    derivativesAllowed: true,
    derivativesApproval: false,
    derivativesAttribution: true,
    derivativesReciprocal: true,
    expiration: null,
    royaltyPolicy: true,
    transferable: true,
    uri: ""
  };

  switch (type) {
    case "1": // Non-Commercial Social Remixing
      return {
        ...baseData,
        commercialUse: false,
        defaultMintingFee: "0",
        commercialRevShare: "0",
        derivativesAllowed: true,
        derivativesApproval: false
      };
    case "2": // Commercial License with Minting Fee
      return {
        ...baseData,
        commercialUse: true,
        defaultMintingFee: "0.1",
        commercialRevShare: "0.1",
        derivativesAllowed: true,
        derivativesApproval: true
      };
    case "3": // Open Commercial Remixing
      return {
        ...baseData,
        commercialUse: true,
        defaultMintingFee: "0",
        commercialRevShare: "0.05",
        derivativesAllowed: true,
        derivativesApproval: false
      };
    default:
      return baseData;
  }
};

const sampleIPAs = [
  {
    title: "Ethereal Wilderness #001",
    description: "A stunning collection of digital artworks featuring natural landscapes and wildlife",
    imageURL: "https://example.com/nature-series.jpg",
    attributes: [],
    tags: ["digital art", "nature", "landscape", "4K"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "Sonic Dreamscape #042",
    description: "An original electronic music composition exploring themes of harmony and rhythm",
    imageURL: "https://example.com/harmony.jpg",
    attributes: [],
    tags: ["music", "electronic", "composition"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "CyberHero Genesis #007",
    description: "A fully rigged 3D character model suitable for games and animations",
    imageURL: "https://example.com/hero-model.jpg",
    attributes: [],
    tags: ["3D", "character", "game asset", "rigged"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "Urban Pulse Collection #216",
    description: "A series of street photography capturing urban life and architecture",
    imageURL: "https://example.com/urban-life.jpg",
    attributes: [],
    tags: ["photography", "urban", "street", "architecture"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "BrandVerse Essentials #103",
    description: "A collection of modern, customizable logo design templates",
    imageURL: "https://example.com/logo-pack.jpg",
    attributes: [],
    tags: ["logo", "design", "template", "branding"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "NightMode UI Genesis #055",
    description: "Complete UI kit featuring dark mode components for modern web applications",
    imageURL: "https://example.com/dark-ui.jpg",
    attributes: [],
    tags: ["UI", "dark mode", "web design", "components"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "SoundScape Odyssey #777",
    description: "A comprehensive collection of sound effects for games and multimedia",
    imageURL: "https://example.com/sfx-bundle.jpg",
    attributes: [],
    tags: ["sound effects", "audio", "game development"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "IconVerse Prime #444",
    description: "Modern material design icon set with multiple sizes and formats",
    imageURL: "https://example.com/icon-set.jpg",
    attributes: [],
    tags: ["icons", "material design", "UI elements"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "NeoSpace Environment #089",
    description: "Detailed 3D environment assets for sci-fi game development",
    imageURL: "https://example.com/scifi-env.jpg",
    attributes: [],
    tags: ["3D", "environment", "sci-fi", "game assets"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  },
  {
    title: "TypoVerse Sans #128",
    description: "A versatile sans-serif font family with multiple weights and styles",
    imageURL: "https://example.com/modern-sans.jpg",
    attributes: [],
    tags: ["font", "typography", "sans-serif"],
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    creator: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
    license: "", // Non-Commercial Social Remixing
    remix: "0",
    royalty: "0"
  }
];

interface LicenseData {
  commercialAttribution: boolean;
  commercialRevCelling: string;
  commercialRevShare: string;
  commercialUse: boolean;
  commercializerChecker: string;
  commercializerCheckerData: string;
  currency: string;
  defaultMintingFee: string;
  derivativeRevCelling: string;
  derivativesAllowed: boolean;
  derivativesApproval: boolean;
  derivativesAttribution: boolean;
  derivativesReciprocal: boolean;
  expiration: null;
  royaltyPolicy: boolean;
  transferable: boolean;
  uri: string;
}

interface IPA {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  attributes: Array<any>;
  tags: string[];
  createdAt: any;
  creator: string;
  license: LicenseData | null;
  remix: string;
  royalty: string;
  status: string;
  updatedAt: any;
}

const createIPA = (data: any): IPA => {
  return {
    id: "",  // Will be set during creation
    title: data.title || "",
    description: data.description || "",
    imageURL: data.imageURL || "",
    attributes: data.attributes || [],
    tags: data.tags || [],
    createdAt: admin.firestore.Timestamp.now(),
    creator: data.creator || "",
    license: null,  // Will be set during creation
    remix: data.remix || "0",
    royalty: data.royalty || "0",
    status: "active",
    updatedAt: admin.firestore.Timestamp.now()
  };
};

async function seedIPAData() {
  try {
    for (const ipaData of sampleIPAs) {
      const docId = uuidv4();
      const docRef = db.collection('IPA').doc(docId);
      
      const ipa = createIPA(ipaData);
      ipa.id = docId;
      ipa.license = createLicenseData("1");

      await docRef.set(ipa);
      console.log(`Added IPA: ${ipa.title} with ID: ${docId}`);
    }
    console.log('Successfully seeded all IPA data!');
  } catch (error: any) {
    console.error('Error seeding IPA data:', error);
    if (error.details) {
      console.error('Error details:', error.details);
    }
  }
}

// Run the seeding function
seedIPAData(); 