<?php

namespace Xypp\ForumQuests\Utils;

use Carbon\Carbon;

class ReAvailableUtils
{
    public static function getExpireTime(string|null $re_available, Carbon $time): Carbon|null
    {
        if (!$re_available)
            return null;
        $re_available_desc = explode(":", $re_available);
        if (count($re_available_desc) != 2)
            return null;
        if ($re_available_desc[0] == "day") {
            return $time->setTime(0, 0, 0)->addDays($re_available_desc[1]);
        } else if ($re_available_desc[0] == "hour") {
            return $time->addHours($re_available_desc[1]);
        } else {
            return null;
        }
    }
}