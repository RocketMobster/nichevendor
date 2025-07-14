React Component Layout Suggestion
Here’s a clean breakdown of reusable React components and pages using a typical structure (modular, scalable):

Core Reusable Components

DashboardCard.js
const DashboardCard = ({ title, value, icon }) => (
  <div className="rounded-xl p-4 bg-orange-100 shadow">
    <div className="flex items-center justify-between">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-sm text-gray-600">{title}</p>
  </div>
);

SalesEntryForm.js
const SalesEntryForm = ({ products, onSubmit }) => {
  const [cart, setCart] = useState({});

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between items-center">
          <span>{product.name}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => decrement(product.id)}>-</button>
            <span>{cart[product.id] || 0}</span>
            <button onClick={() => increment(product.id)}>+</button>
          </div>
        </div>
      ))}
      <button className="w-full bg-orange-500 text-white p-2 rounded-xl" onClick={() => onSubmit(cart)}>
        Complete Sale
      </button>
    </div>
  );
};
BoothLayoutEditor.js
const BoothLayoutEditor = ({ layout, setLayout }) => {
  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <p className="text-gray-600">Booth Layout (Drag & Drop coming soon)</p>
      <ul>
        {layout.map((item, idx) => (
          <li key={idx} className="py-2 border-b">{item.label}</li>
        ))}
      </ul>
      <button onClick={() => setLayout([...layout, { label: 'New Item' }])}>
        ➕ Add Item
      </button>
    </div>
  );
};

📱 Tailwind UI Guidelines
Rounded corners (rounded-xl)
Shadows for cards (shadow, shadow-md)
Use soft orange (#f97316) as primary
Use flex, grid, and gap-4 for layouts
Icons from lucide-react or Heroicons
Consistent use of text-sm, text-lg, and font-bold