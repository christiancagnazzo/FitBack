const dbname = "FitBack.db";
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(dbname, (err) => {
    if (err) throw err;
});

db.serialize(function () {

    db.run("PRAGMA foreign_keys = ON");

    db.run('CREATE TABLE IF NOT EXISTS "exercise"(\
                "id"    INTEGER,\
                "title" TEXT,\
                "difficulty"    TEXT,\
                "ar_video_path" TEXT,\
                "image_path"    TEXT,\
                "description"   TEXT,\
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "user"(\
                "id"    INTEGER,\
                "name"  TEXT,\
                "surname"   TEXT,\
                "height"    TEXT,\
                "age"   INTEGER,\
                "sex"   TEXT,\
                "level" TEXT,\
                "info_review"   INTEGER,\
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "user-exercise"(\
                "id"    INTEGER,\
                "exercise"  INTEGER,\
                "user"  INTEGER,\
                "evaluation"    INTEGER,\
                FOREIGN KEY("exercise") REFERENCES "exercise"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                FOREIGN KEY("user") REFERENCES "user"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "review"(\
                "id"    INTEGER,\
                "exercise"  INTEGER,\
                "date" TEXT",\
                "message" TEXT",\
                "user"  INTEGER,\
                "path_video"    TEXT,\
                FOREIGN KEY("exercise") REFERENCES "exercise"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                FOREIGN KEY("user") REFERENCES "user"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "equipment"(\
                "id"    INTEGER,\
                "name"  INTEGER,\
                "path_foto" TEXT,\
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "muscle"(\
                "id"    INTEGER,\
                "name"  INTEGER,\
                "path_foto" TEXT,\
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "exercise-muscle"(\
        "id"    INTEGER,\
        "exercise"  INTEGER,\
        "muscle"    INTEGER,\
        FOREIGN KEY("exercise") REFERENCES "exercise"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        FOREIGN KEY("muscle") REFERENCES "muscle"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "exercise-equipment"(\
        "id"    INTEGER,\
        "exercise"  INTEGER,\
        "equipment" INTEGER,\
        FOREIGN KEY("exercise") REFERENCES "exercise"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        FOREIGN KEY("equipment") REFERENCES "equipment"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        PRIMARY KEY("id" AUTOINCREMENT))');

    
    db.run("INSERT OR IGNORE INTO user VALUES (1, 'Antonio', 'Cassano', '170', 24, 'M', 'Intermediate', 0)")

});