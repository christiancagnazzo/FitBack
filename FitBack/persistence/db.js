const dbname = "FitBack.db";
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(dbname, (err) => {
    if (err) throw err;
});

db.serialize(function () {

    db.run("PRAGMA foreign_keys = ON");

    db.run('CREATE TABLE IF NOT EXISTS "exercises"(\
                "id"    INTEGER,\
                "title" TEXT,\
                "difficulty"    TEXT,\
                "ar_video_path" TEXT,\
                "image_path"    TEXT,\
                "description"   TEXT,\
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "users"(\
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
                FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                FOREIGN KEY("user") REFERENCES "users"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "reviews"(\
                "id"    INTEGER,\
                "exercise"  INTEGER,\
                "date" TEXT",\
                "message" TEXT",\
                "user"  INTEGER,\
                "path_video"    TEXT,\
                FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                FOREIGN KEY("user") REFERENCES "users"("id") on DELETE CASCADE ON UPDATE CASCADE, \
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "equipments"(\
                "id"    INTEGER,\
                "name"  INTEGER,\
                "path_foto" TEXT,\
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "muscles"(\
                "id"    INTEGER,\
                "name"  INTEGER,\
                "path_foto" TEXT,\
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "exercise-muscle"(\
        "id"    INTEGER,\
        "exercise"  INTEGER,\
        "muscle"    INTEGER,\
        FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        FOREIGN KEY("muscle") REFERENCES "muscles"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "exercise-equipment"(\
        "id"    INTEGER,\
        "exercise"  INTEGER,\
        "equipment" INTEGER,\
        FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        FOREIGN KEY("equipment") REFERENCES "equipments"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        PRIMARY KEY("id" AUTOINCREMENT))');

    
    // USER
    db.run("INSERT OR IGNORE INTO users VALUES (1, 'Antonio', 'Cassano', '170', 24, 'M', 'Intermediate', 0)")
    
    // EXERCISES
    db.run("INSERT OR IGNORE INTO exercises VALUES (1, 'Squat', 'Intermediate', 'video_path', 'squat', 'Description of the exercise')")

});