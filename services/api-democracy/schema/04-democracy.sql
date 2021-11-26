CREATE TABLE democracy( LIKE base INCLUDING ALL );

ALTER TABLE democracy ADD COLUMN parent_id UUID;
ALTER TABLE democracy ADD COLUMN name VARCHAR;
ALTER TABLE democracy ADD COLUMN description VARCHAR;
ALTER TABLE democracy ADD COLUMN population INTEGER DEFAULT 0;
ALTER TABLE democracy ADD COLUMN rules JSONB;
ALTER TABLE democracy ADD COLUMN metas JSONB;

CREATE TRIGGER democracy_update BEFORE UPDATE ON democracy FOR EACH ROW EXECUTE PROCEDURE date_updated();

INSERT INTO democracy(id, name, description, population, rules, metas) VALUES('a062d797-8b6a-499c-9d8b-9a0cdf0871bf','Earth', 'Everyone', 10, '{"democracies": {},"rules": {"approval_percent_minimum": "(approved_votes/democracy_population)*100 >= value ","approval_number_minimum": "approved_votes >= value"}}','{"rules": {"democracies": {"add": {"approval_number_minimum":5},"update": {"approval_percent_minimum":75},"delete": {"approval_percent_minimum":100}},"rules": {"add": {"approval_percent_minimum":75},"update": {"approval_percent_minimum":75},"delete": {"approval_percent_minimum":75}}},"metas": {"add": {"approval_percent_minimum":75},"update": {"approval_percent_minimum":75},"delete": {"approval_percent_minimum":75}}}');

INSERT INTO democracy (id, name, description, population, rules, metas, parent_id) VALUES ('51a9a676-3b1e-47eb-845b-2784ccdd1d59','Test','test',10,'{"a":"b", "c":"d"}','{"rules":{ "add": { "approval_percent_minimum":60 }, "update":{ "approval_percent_minimum":60 }, "delete":{ "approval_percent_minimum":60 }}, "metas":{ "add": { "approval_percent_minimum":80 }, "update":{ "approval_percent_minimum":80 }, "delete":{ "approval_percent_minimum":80 }}}', (SELECT id FROM democracy WHERE parent_id IS NULL LIMIT 1));
