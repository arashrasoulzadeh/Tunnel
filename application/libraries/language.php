<?php 

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class language extends  CI_Controller  {

    public function secho($sid,$lid)
    {
		$this->load->database();
		$query = $this->db->query('SELECT * FROM language WHERE lid='.$lid.' AND sid='.$sid);
		$row = $query->row_array();
		echo $row['str'];
    }
}

?>