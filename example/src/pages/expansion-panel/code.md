```xml
<div class="container">
    <ExpansionPanel name="Panel 1" bind:group expand disabled on:change={onchage}>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
            dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
            velit! Inventore laborum rerum at id?
        </div>
    </ExpansionPanel>

    <ExpansionPanel name="Panel 2" bind:group on:change={onchage}>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
            dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
            velit! Inventore laborum rerum at id?
        </div>
    </ExpansionPanel>

    <ExpansionPanel name="Panel 3" bind:group rotate={false} on:change={onchage}>
        <div slot="icon">
            <Icon>
                <svelte:component this={approval} />
            </Icon>
        </div>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
            dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
            velit! Inventore laborum rerum at id?
        </div>
    </ExpansionPanel>

    <ExpansionPanel name="Panel 4" bind:group on:change={onchage}>
        <div slot="icon">
            <Icon path="M7 10l5 5 5-5z" />
        </div>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
            dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
            velit! Inventore laborum rerum at id?
        </div>
    </ExpansionPanel>
</div>

<script>
    import { ExpansionPanel, Checkbox, Icon } from '/../../src';
    import approval from '/components/icons/svg/approval.svg';
    import { DemoPanel, Description, Properties } from '/components/demo';

    let group = '';

    const onchage = ({ detail }) => {
        console.log(detail.expanded ? 'open' : 'close', detail.name);
    };
</script>

<style>
    .container {
        border-radius: 4px;
    }
</style>
```
