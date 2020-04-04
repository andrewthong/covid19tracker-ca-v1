<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <a class="navbar-brand" href="index.html">COVID-19 Tracker Canada</a>
    <div class="collapse navbar-collapse" id="navbarLinks">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item <?php if ($CURRENT_PAGE == "Graphs") {?>active<?php }?>">
                <a class="nav-link" href="/">Graphs<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item <?php if ($CURRENT_PAGE == "Cases") {?>active<?php }?>">
                <a class="nav-link" href="/cases.php">Cases</a>
            </li>
        </ul>
    </div>
</nav>
