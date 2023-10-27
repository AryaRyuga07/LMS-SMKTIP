<?php

declare(strict_types=1);

namespace App\Traits;

trait SingletonTrait
{
	private static self $instance;

	public static function getInstance()
	{
		if (!isset(self::$instance)) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct()
	{
		// private constructor to prevent direct instantiation
	}
}
