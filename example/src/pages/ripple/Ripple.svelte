<script>
  import { Ripple } from "../../../../src";
  import { DemoPanel, Description, Properties } from "../../components/demo";

  import code from "./code.md";
  import doc from "./doc.md";
  import properties from "./props";
</script>

<DemoPanel>
  <div class="box filled">
    Block level element
    <Ripple />
  </div>
  <div class="box bordered">
    Center Ripple
    <Ripple center />
  </div>

  <div slot="code">
    <div>
      {@html code}
    </div>
  </div>
</DemoPanel>

<Description>
  {@html doc}
</Description>

<Properties data={properties} />

<style>
  .box {
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid var(--primary);
    display: inline-block;
    margin: 0 1rem 1rem 0;
    padding: 0.75rem;
  }
  .box :global(.ripple) {
    border-radius: 0 !important;
  }
  .filled {
    color: var(--alternate);
    background: var(--primary);
  }
  .bordered {
    color: var(--primary);
  }
</style>
