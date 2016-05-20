<?php

protected $dates;


public function __construct()
{
  parent::__construct();
}


public function process()
{
  $this->consolidatedData =  $this->getConsilidateActivityRange();
}

