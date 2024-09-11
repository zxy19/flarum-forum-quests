/// <reference types="flarum/@types/translator-icu-rich" />
import AdminApplication from "flarum/admin/AdminApplication";
import ForumApplication from "flarum/forum/ForumApplication";
export default function humanizeReAvailable(app: ForumApplication | AdminApplication, value: string): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
