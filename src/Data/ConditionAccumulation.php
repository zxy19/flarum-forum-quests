<?php

namespace Xypp\ForumQuests\Data;

use Carbon\Carbon;

class ConditionAccumulation
{
    const MAX_KEEP_DAYS = 30;
    public array $data = [];
    public int $total = 0;
    public int $rest = 0;

    public bool $dirty = false;
    protected bool $sorted = false;
    public string $updateFlag = "";
    public function __construct(?string $data = "{}")
    {
        if (!$data) {
            $data = "{}";
            $this->dirty = true;
        }
        $datas = json_decode($data, true);
        if (!is_array($datas))
            $datas = [];
        foreach ($datas as $key => $value) {
            if ($key == "all") {
                $this->total = $value;
            } else if ($key == "rest") {
                $this->rest = $value;
            } else if ($key == "flg") {
                $this->updateFlag = $value;
            } else {
                $date = Carbon::createFromDate(substr($key, 0, 4), substr($key, 4, 2), substr($key, 6, 2));
                $this->data[] = [
                    "date" => $date,
                    "value" => $value
                ];
            }
        }
        usort($this->data, function ($a, $b) {
            //Reversed sort
            return -($a["date"]->timestamp - $b["date"]->timestamp);
        });
    }
    public function __tostring(): string
    {
        return $this->serialize();
    }
    public function serialize(): string
    {
        $data = [];
        $count = 0;
        $keys = [];
        foreach ($this->data as $value) {
            $key = $value["date"]->format("Ymd");
            if (isset($data[$key])) {
                $data[$key] += $value["value"];
            } else {
                $data[$key] = $value["value"];
                $keys[] = $value["date"];
                $count++;
            }
        }
        if ($count > self::MAX_KEEP_DAYS) {
            usort($keys, function ($a, $b) {
                return -($a->timestamp - $b->timestamp);
            });
            while ($count > self::MAX_KEEP_DAYS) {
                $this->rest += $data[$keys[$count - 1]->format("Ymd")];
                unset($data[$keys[$count - 1]->format("Ymd")]);
                $count--;
            }
        }

        $data["all"] = $this->total;
        $data["rest"] = $this->rest;
        $data["flg"] = $this->updateFlag;
        return json_encode($data);
    }
    protected function sort()
    {
        if ($this->sorted)
            return;
        usort($this->data, function ($a, $b) {
            return -($a["date"]->timestamp - $b["date"]->timestamp);
        });
        $this->sorted = true;
    }
    public function getSpan(Carbon $ref, int $days): int
    {
        $this->sort();
        $ret = 0;
        $begin = $ref->copy()->setDate(0, 0, 0);
        if ($days > 1) {
            $begin = $begin->subDays($days - 1);
        }
        for ($i = 0; $i < count($this->data); $i++) {
            if ($begin->lte($this->data[$i]["date"])) {
                $ret += $this->data[$i]['value'];
            } else {
                break;
            }
        }
        return $ret;
    }
    public function getToday(Carbon $ref): int
    {
        return $this->getSpan($ref, 0);
    }
    public function updateValue(Carbon $ref, int $value, bool $relative = true)
    {
        $ref = $ref->copy()->setTime(0, 0, 0);
        $this->dirty = true;
        if (!count($this->data)) {
            $this->data[] = [
                "date" => $ref,
                "value" => $value
            ];
            $this->total += $value;
        } elseif ($ref->isSameDay($this->data[0]["date"])) {
            if (!$relative) {
                $this->total += $value - $this->data[0]["value"];
                $this->data[0]["value"] = $value;
            } else {
                $this->total += $value;
                $this->data[0]["value"] += $value;
            }
        } else {
            $this->total += $value;
            array_unshift($this->data, [
                "date" => $ref,
                "value" => $value
            ]);
            $this->sorted = false;
        }
    }
    public function updateFlag(string $flag)
    {
        $this->dirty = true;
        $this->updateFlag = $flag;
    }
}