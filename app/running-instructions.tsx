export default function RunningInstructions() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">How to Run This Project</h1>

      <div className="prose prose-blue max-w-none">
        <h2>Prerequisites</h2>
        <ul>
          <li>Node.js 18.x or later</li>
          <li>npm or yarn package manager</li>
        </ul>

        <h2>Installation Steps</h2>
        <ol>
          <li>
            <p>
              <strong>Clone or download the project</strong>
            </p>
            <pre>
              <code>git clone [repository-url]</code>
            </pre>
            <p>Or extract the downloaded ZIP file</p>
          </li>

          <li>
            <p>
              <strong>Navigate to the project directory</strong>
            </p>
            <pre>
              <code>cd tshirt-store</code>
            </pre>
          </li>

          <li>
            <p>
              <strong>Install dependencies</strong>
            </p>
            <pre>
              <code>npm install</code>
            </pre>
            <p>or if you're using yarn:</p>
            <pre>
              <code>yarn install</code>
            </pre>
          </li>

          <li>
            <p>
              <strong>Start the development server</strong>
            </p>
            <pre>
              <code>npm run dev</code>
            </pre>
            <p>or with yarn:</p>
            <pre>
              <code>yarn dev</code>
            </pre>
          </li>

          <li>
            <p>
              <strong>Open your browser</strong>
            </p>
            <p>
              Navigate to <a href="http://localhost:3000">http://localhost:3000</a> to see the application running.
            </p>
          </li>
        </ol>

        <h2>Building for Production</h2>
        <p>To create a production build:</p>
        <pre>
          <code>npm run build</code>
        </pre>
        <p>Then start the production server:</p>
        <pre>
          <code>npm start</code>
        </pre>

        <h2>Project Structure</h2>
        <ul>
          <li>
            <code>/app</code> - Next.js app router pages and layouts
          </li>
          <li>
            <code>/components</code> - Reusable React components
          </li>
          <li>
            <code>/lib</code> - Utility functions and store logic
          </li>
          <li>
            <code>/public</code> - Static assets like images
          </li>
        </ul>

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>LocalStorage Integration</strong> - Cart data, user preferences, and viewed products are stored in
            localStorage
          </li>
          <li>
            <strong>3D Product Viewer</strong> - Interactive 3D models for product customization
          </li>
          <li>
            <strong>Theme Switching</strong> - Press Alt+Q to cycle through different theme variants
          </li>
          <li>
            <strong>Responsive Design</strong> - Works on mobile, tablet, and desktop devices
          </li>
          <li>
            <strong>Product Customization</strong> - Upload images, add text, and customize products
          </li>
        </ul>

        <h2>Customization</h2>
        <p>You can customize the following aspects of the application:</p>
        <ul>
          <li>
            <strong>Colors</strong> - Edit the theme colors in <code>app/globals.css</code>
          </li>
          <li>
            <strong>Products</strong> - Modify the product data in the respective component files
          </li>
          <li>
            <strong>3D Models</strong> - Enhance or replace the 3D models in <code>components/t-shirt-viewer.tsx</code>
          </li>
        </ul>
      </div>
    </div>
  )
}
