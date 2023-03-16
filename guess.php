<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>guess</title>
</head>
<body>
<h1>Guess</h1>
<form method="post" action="game.php">
    <input type="text" name="get" value="<?php echo $_POST['get']?>" required hidden>
    <input type="text" name="guess" minlength="4" maxlength="4" required>
    <input type="submit" value="push">
</form>
</body>
</html>
