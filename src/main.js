import OBR, { buildLine } from "@owlbear-rodeo/sdk";

const ID = "com.gregcanela.owlbear-dead";
const DEAD_KEY = `${ID}/dead`;
const MARKER_KEY = `${ID}/marker`;
const TOOL_ID = `${ID}/tool`;
const MODE_ID = `${TOOL_ID}/mode`;

function isCharacter(item) {
  return item.layer === "CHARACTER";
}

async function getDeadAttachments(tokenId) {
  const attachments = await OBR.scene.items.getItemAttachments([tokenId]);
  return attachments.filter(
    (item) => item.metadata?.[MARKER_KEY] === true
  );
}

async function setDead(tokens, dead) {
  for (const token of tokens) {
    const existingMarkers = await getDeadAttachments(token.id);

    if (!dead) {
      if (existingMarkers.length > 0) {
        await OBR.scene.items.deleteItems(existingMarkers.map((item) => item.id));
      }
      await OBR.scene.items.updateItems([token.id], (items) => {
        for (const item of items) {
          delete item.metadata[DEAD_KEY];
        }
      });
      continue;
    }

    // Avoid creating duplicate X markers.
    if (existingMarkers.length === 0) {
      // The line coordinates are local to the token. Attachment behavior
      // makes the X follow the token's position, rotation and scale.
      const bounds = await OBR.scene.items.getItemBounds([token.id]);

      const size = Math.min(bounds.width, bounds.height) * 0.4;

      const line1 = buildLine()
        .startPosition({ x: -size, y: -size })
        .endPosition({ x: size, y: size })
        .position(token.position)
        .strokeColor("#ff0000")
        .strokeOpacity(1)
        .strokeWidth(8)
        .layer("ATTACHMENT")
        .attachedTo(token.id)
        .locked(true)
        .disableHit(true)
        .disableAutoZIndex(true)
        .metadata({ [MARKER_KEY]: true })
        .build();

      const line2 = buildLine()
        .startPosition({ x: -size, y: size })
        .endPosition({ x: size, y: -size })
        .position(token.position)
        .strokeColor("#ff0000")
        .strokeOpacity(1)
        .strokeWidth(8)
        .layer("ATTACHMENT")
        .attachedTo(token.id)
        .locked(true)
        .disableHit(true)
        .disableAutoZIndex(true)
        .metadata({ [MARKER_KEY]: true })
        .build();

      await OBR.scene.items.addItems([line1, line2]);
    }

    await OBR.scene.items.updateItems([token.id], (items) => {
      for (const item of items) {
        item.metadata[DEAD_KEY] = true;
      }
    });
  }
}

function setupTool() {
  OBR.tool.create({
    id: TOOL_ID,
    shortcut: "C",
    defaultMode: MODE_ID,
    icons: [
      {
        icon: "/dead.svg",
        label: "Dead"
      }
    ]
  });

  OBR.tool.createMode({
    id: MODE_ID,
    icons: [],
    onToolClick: async (_context, event) => {
      if (!event.target || !isCharacter(event.target)) {
        OBR.notification.show("Click a character token.", "INFO");
        return false;
      }

      const token = event.target;
      const isDead = token.metadata?.[DEAD_KEY] === true;
      if (!isDead && token.visible === false) {
        OBR.notification.show("Click a character token.", "INFO");
        return false;
      }

      await setDead([token], !isDead);
      return false;
    }
  });
}

OBR.onReady(() => {
  setupTool();
});
