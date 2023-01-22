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
                "sessiondone" INTEGER, \
                PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "userExercise"(\
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
                "title" TEXT,\
                "date" TEXT,\
                "message" TEXT,\
                "user"  INTEGER,\
                "pathvideo"    TEXT,\
                "paththumbnail"   TEXT,\
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

    db.run('CREATE TABLE IF NOT EXISTS "exerciseMuscle"(\
        "id"    INTEGER,\
        "exercise"  INTEGER,\
        "muscle"    INTEGER,\
        FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        FOREIGN KEY("muscle") REFERENCES "muscles"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        PRIMARY KEY("id" AUTOINCREMENT))');

    db.run('CREATE TABLE IF NOT EXISTS "exerciseEquipment"(\
        "id"    INTEGER,\
        "exercise"  INTEGER,\
        "equipment" INTEGER,\
        FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        FOREIGN KEY("equipment") REFERENCES "equipments"("id") on DELETE CASCADE ON UPDATE CASCADE, \
        PRIMARY KEY("id" AUTOINCREMENT))');

    
    // USER
    db.run("INSERT OR IGNORE INTO users VALUES (1, 'Antonio', 'Cassano', '170', 24, 'M', 'Beginner', 0, 0)")
    
    // EXERCISES
    db.run("INSERT OR IGNORE INTO exercises VALUES (1, 'Squat', 'Beginner', 'video_path', 'squat', 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent the hip and knee joints flex while the ankle joint dorsiflex. During the ascent  the hip and knee joints extend and the ankle joint plantarflexes')")
    db.run("INSERT OR IGNORE INTO exercises VALUES (2, 'Push-up', 'Advanced', 'video_path', 'pushup', 'Push-ups are exercises where you have to keep a prone position: hands palms down under the shoulders balls of the feet on the ground back straight. In this position you pushes the body up and lets it down by an alternate straightening and bending of the arm')")
    db.run("INSERT OR IGNORE INTO exercises VALUES (3, 'Lateral Lunges', 'Intermediate', 'video_path', 'lunges', 'The lateral lunge involves a step out to the side instead of forward or back. Muscles involvment. Because of the lateral movement pattern, the inside groin muscles (the adductors) are more active in this variation than in the other types of lunges')")
    db.run("INSERT OR IGNORE INTO exercises VALUES (4, 'Lift Right Arm', 'Beginner', 'video_path', 'lift', 'This exercise is very simple and is used for arm muscles. It consists of lateral arm raises without weight and therefore is suitable for beginner level users')")

    // EXERCISES-USER
    //db.run("INSERT OR IGNORE INTO userExercise VALUES (1,2,1,50)")

    //remove just for debug for Luca
    //db.run("INSERT OR IGNORE INTO reviews (exercise, title, date, message, user, pathvideo, paththumbnail ) VALUES (2, 'squatError', '2023-30-01', 'Your back was not aligned', 1, '../assets/video/Squat_review', '../assets/video/thumbnail')"    )
   
    // MUSCLES
    db.run("INSERT OR IGNORE INTO muscles VALUES (1, 'Biceps', 'path')")
    db.run("INSERT OR IGNORE INTO muscles VALUES (2, 'Quadriceps', 'path')")
    db.run("INSERT OR IGNORE INTO muscles VALUES (3, 'Calf', 'path')")

    db.run("INSERT OR IGNORE INTO exerciseMuscle VALUES (1, 1, 1)")
    db.run("INSERT OR IGNORE INTO exerciseMuscle VALUES (2, 1, 2)")

    // EQUIPMENTS
    db.run("INSERT OR IGNORE INTO equipments VALUES (1, 'Dummbell', 'path')")
    db.run("INSERT OR IGNORE INTO equipments VALUES (2, 'Kettlebell', 'path')")
    db.run("INSERT OR IGNORE INTO equipments VALUES (3, 'Mat', 'path')")

    db.run("INSERT OR IGNORE INTO exerciseEquipment VALUES (1, 1, 1)")
    db.run("INSERT OR IGNORE INTO exerciseEquipment VALUES (2, 1, 2)")

});