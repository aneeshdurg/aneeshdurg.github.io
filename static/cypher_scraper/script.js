// Mostly code from https://github.com/aneeshdurg/spycy, but modified for the
// blogpost/webscraper tool

function render_table(output, table) {
  if (table.length == 0) {
    output.innerHTML = "<i>empty table</i>"
    return;
  }

  const output_table = document.createElement('table');
  const heading_row = document.createElement('tr');

  const row0 = table[0];
  const table_headings = []
  for (let key of Object.getOwnPropertyNames(row0)){
    const heading = document.createElement('th');
    heading.innerText = key;
    heading_row.appendChild(heading);
    table_headings.push(key);
  }
  output_table.appendChild(heading_row);

  for (let row of table) {
    const content_row = document.createElement('tr');
    for (let key of table_headings) {
      const element = document.createElement('td');
      const data = row[key];
      element.innerText = JSON.stringify(data);
      content_row.appendChild(element);
    }
    output_table.appendChild(content_row);
  }

  output.appendChild(output_table);
}

async function eval_cell(input, output) {
  output.innerHTML = "";

  window.stderr = []
  try {
    await pyodide.runPython(`
      try:
        exe.exec(${JSON.stringify(input.value)})
        result = exe.table_to_json()
      except Exception as e:
        print(e, file=sys.stderr)
        raise Exception from e
    `);
    const output_table = JSON.parse(pyodide.globals.get('result'))
    render_table(output, output_table)
  } catch (e){
    const summary = document.createElement('summary');
    if (window.stderr.length) {
      for (let msg of window.stderr) {
        const error_msg = document.createElement('p');
        error_msg.className = "errormsg";
        error_msg.innerText = msg;
        summary.appendChild(error_msg);
      }
    } else {
      const error_msg = document.createElement('p');
      error_msg.className = "errormsg";
      error_msg.innerText = "UNKNOWN EXECUTION ERROR";
      summary.appendChild(error_msg);
    }

    const details = document.createElement('details');
    const errors = document.createElement('code');
    errors.innerText = e;
    details.appendChild(errors);

    output.appendChild(summary);
    output.appendChild(details);
  }
}

function create_cell(container) {
  const input = document.createElement("textarea");
  input.className = "cellinput";
  const run = document.createElement("button");
  run.innerText = "run"
  const output = document.createElement("div");
  const cell = document.createElement("div");
  const count = container.childElementCount;
  cell.id = "cell" + container.childElementCount;

  cell.addEventListener('focus', () => {
    input.focus();
  });

  const evaluate = async () => {
    await eval_cell(input, output);
    // const nextid = count + 1;
    // const next_el = document.getElementById("cell" + nextid);
    // if (next_el) {
    //   next_el.focus();
    // } else {
    //   create_cell(container);
    // }
  };
  input.addEventListener('keydown', async (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
      evaluate();
    }
  });
  run.addEventListener('click', evaluate);

  cell.appendChild(input);
  cell.appendChild(document.createElement("br"));
  cell.appendChild(run);
  cell.appendChild(document.createElement("br"));
  cell.appendChild(document.createElement("br"));
  cell.appendChild(output);
  cell.appendChild(document.createElement("br"));
  cell.appendChild(document.createElement("br"));
  container.appendChild(cell);
  input.focus();
  container.scrollTop = container.scrollHeight;
}

function setup_notebook() {
  notebook = document.getElementById("notebook");
  create_cell(notebook, 0);
}

async function main(){
  const progress = document.getElementById("progress");
  progress.innerHTML += "Initializing pyodide<br>"

  let pyodide = await loadPyodide();
  progress.innerHTML += "Installing micropip<br>"
  await pyodide.loadPackage('micropip');
  progress.innerHTML += "Installed micropip<br>"

  window.stderr = [];
  console.warn = (x) => {
    window.stderr.push(x);
  };

  const scratch_space = document.createElement("div");
  const source = document.getElementById("source");
  source.value = `
<div id="parent">
  <h1 id="title">Cypher Parser Demo!</h1>
  <div>
    <p id="id0">Lorem ipsum...</p>
  </div>
</div>
`;
  source.addEventListener("keyup", () => {
    source.style.height = source.scrollHeight + "px";
  });
  source.addEventListener("change", () => {
    scratch_space.innerHTML = source.value;
    let counter = 0;
    for (let node of scratch_space.querySelectorAll("*")) {
      node.setAttribute("spycy_uid", counter++);
    }
    source.style.height = source.scrollHeight + "px";
  });
  pyodide.globals.set("scratch_space", scratch_space);

  await pyodide.runPython(`
    import sys

    import js
    preload = js.document.getElementById("preload")
    loaded_env = js.document.getElementById("loaded")
    progress = js.document.getElementById("progress")
    exe = None
    result = None
    import micropip
    async def main():
      global exe
      progress.innerHTML += "Initializing python environment<br>"
      progress.innerHTML += "Installing spycy<br>"
      await micropip.install("https://aneeshdurg.me/spycy/dist/spycy_aneeshdurg-0.0.2-py3-none-any.whl", deps=True)
      progress.innerHTML += "Installed spycy<br>"
      progress.innerHTML += "READY!<br>"

      import spycy
      from spycy.graph import Graph
      from spycy.spycy import CypherExecutor

      from dataclasses import dataclass
      from typing import Any, Dict, List, Mapping, Tuple

      NodeType = int
      EdgeType = Tuple[int, int]

      @dataclass
      class EdgeRetriever:
        def __getitem__(self, edgeid):
          return {"type": "child", "properties": {}}

      @dataclass
      class NodeRetriever:
        def __iter__(self):
          return range(len(scratch_space.querySelectorAll("*"))).__iter__()

        def __getitem__(self, nodeid):
            el = scratch_space.querySelector(f"[spycy_uid='{nodeid}']")
            properties = {a.name: a.value for a in el.attributes if a.name != 'spycy_uid'}
            properties['innerText'] = el.innerText
            return {
              "labels": [el.tagName.lower()],
              "properties": properties,
            }

      @dataclass
      class DOMGraph(Graph[NodeType, EdgeType]):
          @property
          def nodes(self) -> Mapping[NodeType, Any]:
              return NodeRetriever()

          @property
          def edges(self) -> Mapping[EdgeType, Any]:
              return EdgeRetriever()

          def add_node(self, *_) -> NodeType:
              raise Exception("DOMGraph is read-only!")

          def add_edge(self, *_) -> EdgeType:
              raise Exception("DOMGraph is read-only!")

          def out_edges(self, node: NodeType) -> List[EdgeType]:
              el = scratch_space.querySelector(f"[spycy_uid='{node}']")
              edges = []
              for child in el.children:
                edges.append((node, int(child.getAttribute("spycy_uid"))))
              return edges

          def in_edges(self, node: NodeType) -> List[EdgeType]:
              el = scratch_space.querySelector(f"[spycy_uid='{node}']")
              if not el.parent.hasAttribute("spycy_uid"):
                return []
              return [(node, int(el.getAttribute("spycy_uid")))]

          def remove_node(self, _):
              raise Exception("DOMGraph is read-only!")

          def remove_edge(self, _):
              raise Exception("DOMGraph is read-only!")

          def src(self, edge: EdgeType) -> NodeType:
              return edge[0]

          def dst(self, edge: EdgeType) -> NodeType:
              return edge[1]

      exe = CypherExecutor(graph=DOMGraph())

      preload.style = "display:none;"
      loaded_env.style.display = ""
    main()
  `);
  source.dispatchEvent(new Event('change'));

  window.pyodide = pyodide;

  setup_notebook();
}

window.addEventListener("DOMContentLoaded", (event) => {
  main();
});
