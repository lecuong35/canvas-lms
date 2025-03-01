/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useEffect, useState} from 'react'
import {Table} from '@instructure/ui-table'
import doFetchApi from '@canvas/do-fetch-api-effect'
import {useScope as useI18nScope} from '@canvas/i18n'
import {datetimeString} from '@canvas/datetime/date-functions'

const I18n = useI18nScope('content_migrations_redesign')

export const ContentMigrationsTable = () => {
  const [migrations, setMigrations] = useState<any>([])

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    doFetchApi({
      path: `/api/v1/courses/${window.ENV.COURSE_ID}/content_migrations`,
      params: {per_page: 25},
    }).then((response: any) => {
      setMigrations(response.json)
    })
  }, [])

  return (
    <Table caption={I18n.t('Content Migrations')}>
      <Table.Head>
        <Table.Row>
          <Table.ColHeader themeOverride={{padding: '0.6rem 0'}} id="content_type">
            {I18n.t('Content Type')}
          </Table.ColHeader>
          <Table.ColHeader themeOverride={{padding: '0.6rem 0'}} id="source_link">
            {I18n.t('Source Link')}
          </Table.ColHeader>
          <Table.ColHeader themeOverride={{padding: '0.6rem 0'}} id="date_imported">
            {I18n.t('Date Imported')}
          </Table.ColHeader>
          <Table.ColHeader themeOverride={{padding: '0.6rem 0'}} id="status">
            {I18n.t('Status')}
          </Table.ColHeader>
          <Table.ColHeader themeOverride={{padding: '0.6rem 0'}} id="progress">
            {I18n.t('Progress')}
          </Table.ColHeader>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {migrations.map((cm: any) => (
          <Table.Row key={cm.id}>
            <Table.Cell themeOverride={{padding: '1.1rem 0rem'}}>
              {cm.migration_type_title}
            </Table.Cell>
            <Table.Cell> </Table.Cell>
            <Table.Cell>
              {datetimeString(cm.created_at, {timezone: ENV.CONTEXT_TIMEZONE})}
            </Table.Cell>
            <Table.Cell> </Table.Cell>
            <Table.Cell> </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default ContentMigrationsTable
