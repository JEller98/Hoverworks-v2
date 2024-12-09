CREATE TABLE products(
    prodID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    prodType VARCHAR (50) NOT NULL DEFAULT "Undefined", -- board, bike, or skate
    prodPrice FLOAT NOT NULL DEFAULT 0.01,
    prodName VARCHAR (50) NOT NULL DEFAULT "Undefined Product",
    prodDesc VARCHAR (1000),
    stock INT, -- for inventory purposes
    deckLength INT, -- NULL for non-boards
    skateSize INT -- NULL for non-skates
);

CREATE TABLE orders(
    orderID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    orderName VARCHAR (100) NOT NULL DEFAULT "John Doe",
    orderSubTotal FLOAT NOT NULL DEFAULT 0.01,
    orderTax FLOAT,
    orderPromo FLOAT, -- discount codes, SUBTRACT this amount from orderTotal
    orderTotal FLOAT NOT NULL DEFAULT 0.01,
    orderDate DATETIME DEFAULT NOW(),
    orderStatus VARCHAR (50) NOT NULL DEFAULT "Pending" -- Pending, Processing, Shipping, Delivered, Canceled...
    -- CONSTRAINT chk_price CHECK (orderSubTotal > 0 AND orderTotal > 0) -- No negatives in the subtotal/total price
    -- bring over the user's address as a foreign key? Maybe?
);