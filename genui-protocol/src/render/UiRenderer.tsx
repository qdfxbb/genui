import { AiResponse, UiNode, uiRegistry } from "../ui/ui";

type UiRendererProps = {
    aiResponse: AiResponse;
}

type ComponentRenderProps = {
    node: UiNode;
}

export default function UiRenderer(props: UiRendererProps) {
    const { aiResponse } = props;
    const children = aiResponse.children;
    if (children === undefined || children.length === 0) {
        return <div>No children</div>
    }
    return <div>
        {
            children.map((child, index) => 
                <ComponentRender key={index} node={child}/>
            )
        }

    </div>

}

function ComponentRender(props: ComponentRenderProps) {
    const { node } = props;
    const {type, props: properties} = node;
    const component = uiRegistry.blocks.get(type);
    if (component === undefined) {
        return <div>Unknown component: {type}</div>
    }
    const Ui = component.component;
    let childrenToRender: React.ReactNode[] | undefined;
    if (component.definition.children === true) {
        childrenToRender = node.children?.map((childNode, index) => (
            <ComponentRender
                key={index} node={childNode}
            />
        ))
    }

    return <Ui {...properties} {...(childrenToRender !== undefined && childrenToRender.length > 0 ? {children: childrenToRender} : {})}>
    </Ui>
}