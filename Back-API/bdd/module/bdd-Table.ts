/*######################################################
Table
######################################################*/
let tables: Array<Array<string>> = [];

let PresetTab = "CREATE TABLE IF NOT EXISTS `Preset` (";
PresetTab = PresetTab + "`id` INT NOT NULL AUTO_INCREMENT,";
PresetTab = PresetTab + "`nom` VARCHAR(100) NULL,";
PresetTab = PresetTab + "`desc` VARCHAR(500) NULL,";
PresetTab = PresetTab + "`mdp` VARCHAR(500) NULL,";
PresetTab = PresetTab + "`mdpAdmin` VARCHAR(500) NULL,";
PresetTab = PresetTab + "PRIMARY KEY (`id`)";
PresetTab = PresetTab + ");";
tables.push(["Preset", PresetTab]);

let ElementTab = "CREATE TABLE IF NOT EXISTS `Element` (";
ElementTab = ElementTab + "`id` INT NOT NULL AUTO_INCREMENT,";
ElementTab = ElementTab + "`presetID` INT,";
ElementTab = ElementTab + "`nom` VARCHAR(100) NULL,";
ElementTab = ElementTab + "`data` VARCHAR(500) NULL,";
ElementTab = ElementTab + "`img` INT NULL,";
ElementTab = ElementTab + "PRIMARY KEY (`id`),";
ElementTab =ElementTab +" FOREIGN KEY (`presetID`)"
ElementTab =ElementTab +" REFERENCES `Preset` (`id`)"
ElementTab =ElementTab +" ON DELETE NO ACTION"
ElementTab =ElementTab +" ON UPDATE NO ACTION"
ElementTab = ElementTab + ");";
tables.push(["Element", ElementTab]);

let CombinaisonTab = "CREATE TABLE IF NOT EXISTS `Combinaison` (";
CombinaisonTab = CombinaisonTab + "`id` INT NOT NULL AUTO_INCREMENT,";
CombinaisonTab = CombinaisonTab + "`presetID` INT,";
CombinaisonTab = CombinaisonTab + "`element1ID` INT NULL,";
CombinaisonTab = CombinaisonTab + "`element2ID` INT NULL,";
CombinaisonTab = CombinaisonTab + "`resultatID` INT NULL,";
CombinaisonTab = CombinaisonTab + "`img` int NULL,";
CombinaisonTab = CombinaisonTab + "PRIMARY KEY (`id`),";
CombinaisonTab =CombinaisonTab +" FOREIGN KEY (`presetID`)"
CombinaisonTab =CombinaisonTab +" REFERENCES `Preset` (`id`)"
CombinaisonTab =CombinaisonTab +" ON DELETE NO ACTION"
CombinaisonTab =CombinaisonTab +" ON UPDATE NO ACTION,"
CombinaisonTab =CombinaisonTab +" FOREIGN KEY (`element1ID`)"
CombinaisonTab =CombinaisonTab +" REFERENCES `Element` (`id`)"
CombinaisonTab =CombinaisonTab +" ON DELETE NO ACTION"
CombinaisonTab =CombinaisonTab +" ON UPDATE NO ACTION,"
CombinaisonTab =CombinaisonTab +" FOREIGN KEY (`resultatID`)"
CombinaisonTab =CombinaisonTab +" REFERENCES `Element` (`id`)"
CombinaisonTab =CombinaisonTab +" ON DELETE NO ACTION"
CombinaisonTab =CombinaisonTab +" ON UPDATE NO ACTION"
CombinaisonTab = CombinaisonTab + ");";
tables.push(["Combinaison", CombinaisonTab]);

let ImageTab = "CREATE TABLE IF NOT EXISTS `Image` (";
ImageTab = ImageTab + "`id` INT NOT NULL AUTO_INCREMENT,";
ImageTab = ImageTab + "`nom` VARCHAR(100) NULL,";
ImageTab = ImageTab + "`data` VARCHAR(500) NULL,";
ImageTab = ImageTab + "PRIMARY KEY (`id`)";
ImageTab = ImageTab + ");";
tables.push(["Image", ImageTab]);

let TempTab = "";
TempTab = TempTab + "";
//tables.push(["Temp",TempTab]);

/*######################################################
Main
######################################################*/
function addTable(db: any, table: Array<string>) {
    let newbdd = table[1];
    db.query(newbdd, function (err: any, result: any) {
        if (err) throw err;
        console.log("TABLE created : " + table[0]);
    });
}
export function main(db: any) {
    for (var i = 0; i < tables.length; i++) {
        addTable(db, tables[i])
    }
}
