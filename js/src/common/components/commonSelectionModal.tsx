import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import ForumApplication from 'flarum/forum/ForumApplication';
import AdminApplication from 'flarum/admin/AdminApplication';
export default class commonSelectionModal extends Modal<{
    items: Record<string, string>,
    title: string,
    button: string,
    callback: (name: string) => void
    cancel: () => void
} & IInternalModalAttrs> {
    selection = "";
    done: boolean = false;
    oninit(vnode: any): void {
        super.oninit(vnode);
        this.selection = this.attrs.items[Object.keys(this.attrs.items)[0]];
    }
    className() {
        return 'Modal';
    }
    title() {
        return this.attrs.title;
    }
    oncreate(vnode: any): void {
        super.oncreate(vnode);
    }
    onremove(vnode: any): void {
        super.onremove(vnode);
        if (!this.done)
            this.attrs.cancel();
    }
    content() {
        const that = this;
        return (
            <div className="Modal-body">
                <div className="Form">
                    <div className="Form-group">
                        <Select className="FormControl" value={this.selection} options={this.attrs.items} onchange={((name: string) => {
                            this.selection = name;
                        }).bind(this)} />
                    </div>
                    <div className="Form-group">
                        <Button class="Button Button--primary" type="submit" loading={this.loading}>
                            {this.attrs.button}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    async onsubmit(e: any) {
        e.preventDefault();
        this.done = true;
        this.attrs.callback(this.selection);
    }
    public static open(app: ForumApplication | AdminApplication, items: Record<string, string>, title: string, button: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            app.modal.show(commonSelectionModal, {
                items: items,
                title: title,
                button: button,
                cancel: () => {
                    reject();
                },
                callback: (name: string) => {
                    resolve(name);
                    app.modal.close();
                }
            },true);
        });
    }
}
