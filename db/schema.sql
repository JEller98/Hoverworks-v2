CREATE TABLE products(
    prodID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    prodType VARCHAR (50) NOT NULL "Undefined", -- board, bike, or skate
    prodPrice FLOAT NOT NULL DEFAULT 0.01,
    prodName VARCHAR (50) NOT NULL DEFAULT "Undefined Product",
    prodDesc VARCHAR (500),
    prodColor VARCHAR (50),
    engineType VARCHAR (8),
    stock INT, --for inventory purposes
    deckLength INT, -- NULL for non-boards
    skateSize INT, -- NULL for non-skates
)

CREATE TABLE orders(
    orderID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    orderName VARCHAR (100) NOT NULL DEFAULT "John Doe",
    orderSubTotal FLOAT NOT NULL DEFAULT 0.01,
    orderTax FLOAT,
    orderPromo FLOAT, --discount codes, SUBTRACT this amount from orderTotal
    orderTotal FLOAT NOT NULL DEFAULT 0.01,
    orderDate DATETIME DEFAULT NOW(),
    orderStatus VARCHAR (50) NOT NULL DEFAULT "Pending", --Pending, Processing, Shipping, Delivered, Canceled...
    CONSTRAINT chk_price CHECK (orderSubTotal > 0 AND orderTotal > 0) --No negatives in the subtotal/total price
    --bring over the user's address as a foreign key? Maybe?
)

/*
CREATE TABLE cart(
    --how would I create a unique system to keep track of a given ID# for an item in a user's cart...
    --like board #5 is the first item in a user's cart, so it'd be item #1

    quantity INT,
    CHECK (quantity > -1), -- make sure a user can't buy negative items

    fk_prodID INT,
    FOREIGN KEY (fk_prodID) REFERENCES products(prodID),
    fk_orderID INT,
    FOREIGN KEY (fk_orderID) REFERENCES orders(orderID),
)

CREATE TABLE user( --am I going too far with this?
    usedID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    userMail VARCHAR (255) UNIQUE NOT NULL --PII, maybe encrypt? Make sure it's valid before storage
    --add an address column later, ensure they're encrypted. This is PII, it should NOT be stored in plaintext.
    --userPass goes here; same story as userAddress, it needs to be encrypted for safety's sake.
)
*/