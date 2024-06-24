CREATE DATABASE M06_UF4_PT1;

CREATE USER 'productusr'@'localhost' IDENTIFIED BY 'productpass';

GRANT ALL PRIVILEGES ON M06_UF4_PT1.* TO 'productusr'@'localhost';

FLUSH PRIVILEGES;


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10,2),
    category VARCHAR(255),
    favorite BOOLEAN
);

INSERT INTO products (name, description, image, price, category, favorite)
VALUES
('Primary Cell Cultures', 'Our Primary Cell Cultures are sourced from various tissues and organs, ensuring purity, viability, and functionality for your biomedical research needs.', '/img/primary_cell_cultures.webp', 100.00, 'Primary Cell Cultures', true),
('Cell Lines', 'Explore our Cell Lines, including cancer, immortalized, and reporter cell lines, available with various genetic modifications for biomedical research.', '/img/cell_lines.webp', 150.00, 'Cell Lines', false),
('Custom Cell Engineering', 'Tailor-made Custom Cell Engineering services, including gene editing and CRISPR/Cas9 genome engineering, to create novel cell models for your research.', '/img/custom_cell_engineering.webp', 200.00, 'Custom Cell Engineering', true),
('Cellular Assays', 'Discover our Cellular Assays for assessing cell viability, proliferation, apoptosis, and other cellular functions, providing valuable insights for drug discovery and toxicology studies.', '/img/cellular_assays.webp', 120.00, 'Cellular Assays', false),
('Stem Cell Products', 'Explore our Stem Cell Products, including induced pluripotent stem cells (iPSCs), mesenchymal stem cells (MSCs), and neural stem cells (NSCs), for regenerative medicine and disease modeling applications.', '/img/stem_cell_products.webp', 180.00, 'Stem Cell Products', true);
