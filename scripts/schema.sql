--updated schema for PostGres
CREATE TABLE IF NOT EXISTS products (
    prodID SERIAL NOT NULL PRIMARY KEY,
    prodType VARCHAR (50) NOT NULL DEFAULT 'Undefined', -- board, bike, or skate
    prodPrice DECIMAL (10, 2) NOT NULL DEFAULT 0.01,
    prodName VARCHAR (50) NOT NULL DEFAULT 'Undefined Product',
    prodDesc TEXT, --TEXT means unlimited characters, better for descriptions
    prodImg TEXT, --store filepath
    stock INT, -- for inventory purposes
    deckLength INT, -- NULL for non-boards
    skateSize TEXT -- NULL for non-skates
);

CREATE TABLE IF NOT EXISTS orders (
    orderID SERIAL NOT NULL PRIMARY KEY,
    orderName VARCHAR (100) NOT NULL DEFAULT 'John D',
    orderTotal DECIMAL (10, 2) NOT NULL DEFAULT 0.01,
    orderDate DATE DEFAULT CURRENT_DATE, --DATE = date, CURRENT_DATE = NOW()
    orderStatus VARCHAR (50) NOT NULL DEFAULT 'Pending' -- Pending, Processing, Shipping, Delivered, Canceled...
);

CREATE TABLE IF NOT EXISTS order_items (
    itemID SERIAL PRIMARY KEY,
    orderID INT NOT NULL REFERENCES orders(orderID),
    prodID INT NOT NULL REFERENCES products(prodID),
    quantity INT NOT NULL,
    priceAtPurchase DECIMAL (10, 2) NOT NULL
);