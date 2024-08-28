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
                $this->data[] = [
                    "date" => $key,
                    "value" => $value
                ];
            }
        }
        $this->sort();
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
            $key = $value["date"];
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
                return ($a > $b) ? -1 : 1;
            });
            while ($count > self::MAX_KEEP_DAYS) {
                $this->rest += $data[$keys[$count - 1]];
                unset($data[$keys[$count - 1]]);
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
            return ($a["date"] > $b["date"]) ? -1 : 1;
        });
        $this->sorted = true;
    }
    public function getSpan(Carbon $ref, int $days): int
    {
        $this->sort();
        $ret = 0;
        $begin = $ref->format("Ymd");
        if ($days > 1) {
            $begin = $ref->copy()->subDays($days - 1)->format("Ymd");
        }
        for ($i = 0; $i < count($this->data); $i++) {
            if ($this->data[$i]["date"] >= $begin) {
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
        $ref = $ref->copy()->format("Ymd");
        $this->dirty = true;
        if (!count($this->data)) {
            $this->data[] = [
                "date" => $ref,
                "value" => $value
            ];
            $this->total += $value;
        } elseif ($ref == $this->data[0]["date"]) {
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
    public function clear()
    {
        $this->data = [];
        $this->total = 0;
        $this->dirty = true;
        $this->updateFlag = "";
        $this->sorted = true;
        $this->rest = 0;
    }
    public function resetTotal(int $total)
    {
        $this->clear();
        $this->total = $total;
        $this->rest = $total;
        $this->dirty = true;
    }
}