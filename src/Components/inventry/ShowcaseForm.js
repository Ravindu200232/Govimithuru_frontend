import React, { useState } from 'react';
import './css/ShowcaseForm.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const predefinedItems = [


  //seed

  "Tomato Seed","Pumpkin Seed","Cucumber Seed","Carrot Seed","Pepper Seed",
  


  // Growth Promoters
  "Seaweed extract", "Humic acid", "Amino acid solutions", "Mycorrhizal fungi",
  "Plant hormones (e.g., auxins, gibberellins)", "Rooting powders", "Foliar sprays",
  "Organic compost teas", "Bio-stimulants", "Trichoderma products", "Liquid kelp",
  "Super phosphates", "Worm castings", "Bacterial inoculants", "Organic mulch",
  "Nutrient-dense fertilizers", "Microbial inoculants", "Fish emulsion", 
  "Vitamin B12 supplements", "Organic growth enhancers", "Fermented plant extracts",
  "Plant extracts (e.g., neem oil)", "Aloe vera gel", "Cacao shell mulch",
  "Phosphorus solubilizers", "Biochar", "Compost", "Bone meal", "Nettle tea",
  "Plant probiotics", "Chitosan", "Calcium carbonate", "Magnesium sulfate",
  "Organic insecticides", "Plant sugars", "Silicon supplements", "Cold-pressed oils",
  "Green manures", "Lactobacillus cultures", "Saponins", "Citrus extracts",
  "Garlic extract", "Vinegar-based solutions", "Molasses", "Charcoal", "Herbal teas",
  "Yeast extracts", "Plant protein hydrolysates", "Protein-rich fertilizers",
  "Nutritional enzymes",

  // Remedies
  "Neem oil", "Diatomaceous earth", "Insecticidal soap", "Baking soda fungicide",
  "Garlic spray", "Chili pepper spray", "Epsom salts", "Rubbing alcohol for pests",
  "Boric acid traps", "Copper fungicide", "Hydrogen peroxide", "Citrus oil spray",
  "Vinegar for weeds", "Corn gluten meal", "Essential oils (e.g., peppermint)",
  "Castile soap", "Organic herbicides", "Tea tree oil", "Pyrethrin sprays",
  "Fish oil repellents", "Compost tea for disease control", "Molasses for soil health",
  "Wood ash as fertilizer", "Plant-based repellents", "Soapnut solutions",
  "Essential oil diffusers", "Companion planting strategies", "Pest-resistant plants",
  "Homemade traps", "Fermented plant juices", "Spinosad", "Beneficial nematodes",
  "Lavender oil", "Clove oil", "Bio-pesticides", "Foliar nutrient sprays",
  "Kelp meal for growth", "Citrus peel barriers", "Chopped garlic in soil",
  "Cider vinegar traps", "Baking soda for powdery mildew", "Natural fungicides",
  "Anti-fungal teas", "Herbicidal soap", "Soap nut wash for fruits", 
  "Molasses soil amendments", "Fermented whey", "Aloe vera as a pest repellent",
  "Comfrey leaf extract", "Potato peels for pest control",

  // Organic Farming
  "Organic seeds", "Green manures", "Crop rotation systems", "Cover crops", 
  "Organic mulch", "Companion planting guides", "Organic pest control products", 
  "Permaculture techniques", "Organic soil amendments", "Eco-friendly weed control", 
  "Sustainable irrigation systems", "Biodynamic farming inputs", "Organic compost", 
  "Natural fertilizers", "Seed saving kits", "Organic certification resources", 
  "Native plant seeds", "Wildlife habitats", "Organic herbicides", 
  "Renewable energy sources (e.g., solar)", "Rainwater harvesting systems", 
  "Vertical farming setups", "Organic insect attractants", "Hand tools for organic gardening", 
  "Organic crop insurance", "Community-supported agriculture (CSA)", 
  "Eco-friendly packaging", "Organic gardening workshops", "Soil health testing kits", 
  "Organic food preservation supplies", "Heirloom seeds", "Organic bee supplies", 
  "Organic greenhouse materials", "Cold frames", "Organic hydroponic systems", 
  "Aquaponic supplies", "Organic fertilizers (e.g., fish emulsion)", 
  "Soil testing kits", "Integrated pest management (IPM) guides", 
  "Organic landscaping materials", "Natural planting guides", "Organic livestock feed", 
  "Organic fruit tree care supplies", "Natural dyes from plants", 
  "Organic vegetable growing kits", "Pollinator-friendly plants", 
  "Organic soil testing services", "Educational resources for organic farming", 
  "Organic pest traps", "Organic gardening blogs or magazines",

  // Equipment
  "Hand trowels", "Pruning shears", "Garden forks", "Hoes", "Rakes", "Shovels",
  "Soil testers", "Compost bins", "Seed starting trays", "Sprayers (handheld and backpack)",
  "Drip irrigation kits", "Garden gloves", "Watering cans", "Wheelbarrows", "Cultivators",
  "Greenhouses", "Cold frames", "Garden hoses", "Mulching tools", "Rototillers", 
  "Sickle or scythe", "Plant supports (stakes, cages)", "Soil augers", 
  "Electric or gas-powered tillers", "Pest traps", "Planting guides and templates", 
  "Raised bed kits", "Harvesting baskets", "Grafting tools", "Seeders and planters", 
  "Weeders", "Fertilizer spreaders", "Soil moisture meters", "Shade cloth", 
  "Row covers", "Lawn mowers (manual and electric)", "Insect netting", 
  "Hydroponic systems", "Aquaponic equipment", "Organic pest control sprayers", 
  "Outdoor storage sheds", "Garden carts", "Portable greenhouse kits", 
  "Trimmers (hedge and grass)", "Harvesting knives", "Tarp for collecting leaves", 
  "Protective netting", "Soil sieve", "Water timers", "Compost aerators",

  // Fertilizers
  "Compost", "Manure", "Fish emulsion", "Bone meal", 
  "Blood meal", "Kelp meal", "Worm castings", "Rock phosphate", "Greensand", 
  "Epsom salts", "Alfalfa meal", "Cottonseed meal", "Molasses", "Seaweed extract", 
  "Organic granular fertilizers", "Liquid organic fertilizers", "Organic NPK fertilizers", 
  "Humic acid products", "Micronutrient mixes", "Slow-release organic fertilizers", 
  "Fermented plant juices", "Green manure crops", "Cover crop mixes", 
  "Compost tea", "Organic liquid fertilizers", "Guano (bat or seabird)", 
  "Sulfate of potash", "Organic sulfate fertilizers", "Rock dust", 
  "Organic fish powders", "Diatomaceous earth", "Organic citrus fertilizer", 
  "Organic bloom boosters", "Vegetable garden fertilizers", "Organic fruit tree fertilizers", 
  "Organic nitrogen boosters", "Organic soil amendments", "Foliar feed options", 
  "Organic fertilizers for lawns", "Bone char", "Organic phosphate fertilizers", 
  "Liquid kelp fertilizers", "Microbial fertilizers", "Organic calcium sources", 
  "Organic fertilizers for container plants", "Fertilizer spikes", 
  "Organic fertilizers for hydroponics", "Pelletized organic fertilizers", 
  "Organic sweeteners for soil", "Natural compost additives",

  // Irrigation
  "Drip irrigation kits", "Soaker hoses", "Sprinkler systems", "Garden hoses", 
  "Water timers", "Rain barrels", "Irrigation controllers", "Sprayer attachments", 
  "PVC piping for irrigation", "Hose reels", "Micro-sprinklers", "Automatic drip emitters", 
  "Hose connectors", "Watering cans", "Irrigation stakes", "Pressure regulators", 
  "Surface irrigation systems", "Siphon irrigation setups", "Fogging systems", 
  "Aquaponic water systems", "Hydroponic water pumps", "Landscape irrigation supplies", 
  "Water filters for irrigation", "Garden misting systems", "Floating irrigation systems", 
  "Watering wands", "Irrigation hoses", "Subsurface irrigation systems", 
  "Mulched irrigation setups", "Rain gauges", "Moisture meters", 
  "Water collection barrels", "Landscape fabric for irrigation", "Watering globes", 
  "Irrigation design software", "Leak detection systems", "Bulk water storage tanks", 
  "Drip tape", "Water conservation tools", "Solar-powered irrigation pumps", 
  "Aqueducts for large farms", "Portable irrigation systems", "Irrigation scheduling tools", 
  "Landscape irrigation design services", "Hydroponic nutrient solutions", 
  "Underground irrigation systems", "Water softeners", "Garden spigots", 
  "Gravity-fed irrigation systems", "Timer-controlled sprinkler heads",
];

function ShowcaseForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [packetSize, setPacketSize] = useState(1);
  const [unit, setUnit] = useState('kg');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  function resetForm() {
    setName('');
    setImage(null);
    setCategory('');
    setDescription('');
    setPacketSize(1);
    setUnit('kg');
    setPrice('');
    setDiscount('');
  }

  async function sendData(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedUnit = `${packetSize}${unit}`;
    const formattedName = `${name} (${formattedUnit})`;

    const formData = new FormData();
    formData.append('name', formattedName);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('unit', formattedUnit);
    formData.append('price', price);
    formData.append('discount', discount);

    try {
      await axios.post('http://localhost:8000/showcase/add', formData);
      toast.success('Showcase Item Added');
      resetForm();
    } catch (err) {
      setError('Failed to add showcase item. Please try again.');
      toast.error('Failed to add showcase item. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="showcase-form-container">
      <h2>Add Showcase Item</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="showcase-form" onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <select
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          >
            <option value="">Select Item Name</option>
            {predefinedItems.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
          {name === "custom" && (
            <input
              type="text"
              placeholder="Enter Custom Item Name"
              value={name !== "custom" ? name : ""}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option>Seeds</option>
            <option>Growth Promoters</option>
            <option>Remedies</option>
            <option>Organic Farming</option>
            <option>Equipment</option>
            <option>Fertilizers</option>
            <option>Irrigation</option>
            <option>Gardening</option>
            <option>Bulk</option>
            {/* Add more categories as options here */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="packetSize">Packet Size</label>
          <input
            type="number"
            id="packetSize"
            min="1"
            max="500"
            value={packetSize}
            onChange={(e) => setPacketSize(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <option value="kg">KG</option>
            <option value="l">L</option>
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="item">Item</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            min="0"
            max="1000000"
            step="0.01" // Allows decimals with two places
            value={price}
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (value > 1000000) {
                value = 1000000;
              }
              setPrice(value.toFixed(2)); // Ensures two decimal places
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            placeholder="Enter Discount (0-100)"
            value={discount}
            onChange={(e) => {
              const value = Math.max(0, Math.min(100, e.target.value)); // Ensure value is between 0 and 100
              setDiscount(value);
            }}
            min="0"
            max="100"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="add-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ShowcaseForm;