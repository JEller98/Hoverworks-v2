--updated seed file for PostGres
INSERT INTO products(prodType, prodPrice, prodName, prodDesc, prodImg, stock, deckLength, skateSize) VALUES
('Hoverboard', 350.00, 'Alloyed Eagle V.7x32',
'The latest installment in Hoverworks'' signature "Alloyed Eagle" series, the Alloyed Eagle V.7 is powered by our cutting-edge V12 engine. This aeroenergetic powerhouse allows our hoverboards to go further and faster while making less noise, making any gear with the V12 engine perfect for galesurfing hobbyists who need to practice without disturbing their neighbors. The deck sits at a comfortable 32 inches in length, making it a solid choice for beginner surfers.',
'/danielsleep.PNG', 143, 32, NULL),
('Hoverbike', 1350.00, 'Wild Wasp V.1',
'Introducing the Wild Wasp, the first in Hoverworks'' new series of e-friendly Hoverbikes! Designed with the working-class citizen in mind, the Wild Wasp blends a vintage design remniscient of Piaggio''s iconic "Vespa" scooters with the latest and greatest in clean technology while maintaining an economically-friendly pricetag for the invaluable movers and shakers that make the world go round. Sporting a higher-power iteration of Hoverworks'' industry-leading engines, the Wild Wasp is sure to get you where you need to go with nothing but the power of highly-pressurized air.',
'/danielsleep.PNG', 50, NULL, NULL),
('Hoverskates', 175.00, 'Ripgliders V.5',
'A staple fashion piece for galesurfers worldwide, the Ripgliders V.5 introduces a Bluetooth-powered switch to toggle the pressure jets (alongside the manual switch located on the outer ankle of each skate), allowing for a seamless transition from galesurfing to walking, jogging, freerunning, or any other activity that powers your world. The Ripgliders also feature a concave cutout in the soles as part of our partnership with Soap!',
'/danielsleep.PNG', 654, NULL, 'Small, Medium, Large, XL, Wide'),
('Hoverboard', 225.00, 'Mini Mantis V.2',
'The Mini Mantis Hoverboard is the perfect gift to introduce the youngster in your life to the up-and-coming sport of galesurfing! Featuring a shorter deck length and our lower-power V4 engine, the Mini Mantis provides children with an exhilarating galesurfing experience while staying within children''s safety regulations.',
'/danielsleep.PNG', 78, 24, NULL),
('Other', 20.00, 'Self-service Kit',
'This self-service kit allows our customers to alter and customize their Hoverworks products to their hearts'' content. Is your Alloyed Eagle a little too slow for your taste? Maybe the Wild Wasp has been in need of a tune-up, but you can''t get an appointment with your local repairman? Fear no longer, the right to repair is in your hands! Hoverworks Ltd. does not claim responsibility for any malfunctioning or unexpected behavior caused by the introduction of 3rd-party components into our products.',
'/danielsleep.PNG', 253, NULL, NUll);

INSERT INTO orders (orderName, orderTotal, orderDate, orderStatus) VALUES
('Alice S.', 27.00, CURRENT_DATE, 'Pending'),
('Bob J.', 16.50, CURRENT_DATE, 'Processing'),
('Carol W.', 52.50, CURRENT_DATE, 'Shipping'),
('David B.', 10.50, CURRENT_DATE, 'Delivered'),
('Eve D.', 31.00, CURRENT_DATE, 'Canceled');