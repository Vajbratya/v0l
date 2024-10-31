import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Settings } from 'lucide-react';
import { getActivityLogs } from 'lib/db/queries';
import { ActivityType } from 'lib/db/schema';

const iconMap: Record<string, any> = {
  [ActivityType.SIGN_IN]: Settings,
  [ActivityType.SIGN_OUT]: Settings,
  [ActivityType.UPDATE_PASSWORD]: Settings,
  [ActivityType.DELETE_ACCOUNT]: Settings,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.CREATE_TEAM]: Settings,
  [ActivityType.REMOVE_TEAM_MEMBER]: Settings,
  [ActivityType.INVITE_TEAM_MEMBER]: Settings,
  [ActivityType.ACCEPT_INVITATION]: Settings,
};

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_IN:
      return 'Iniciou sessão na plataforma';
    case ActivityType.SIGN_OUT:
      return 'Encerrou sessão na plataforma';
    case ActivityType.UPDATE_PASSWORD:
      return 'Atualizou a senha da conta';
    case ActivityType.DELETE_ACCOUNT:
      return 'Excluiu permanentemente a conta';
    case ActivityType.UPDATE_ACCOUNT:
      return 'Atualizou informações da conta';
    case ActivityType.CREATE_TEAM:
      return 'Criou uma nova equipe médica';
    case ActivityType.REMOVE_TEAM_MEMBER:
      return 'Removeu um membro da equipe';
    case ActivityType.INVITE_TEAM_MEMBER:
      return 'Enviou um convite para novo membro';
    case ActivityType.ACCEPT_INVITATION:
      return 'Aceitou convite para participar da equipe';
    case ActivityType.SIGN_UP:
      return 'Criou uma nova conta na plataforma';
    default:
      return action;
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'agora mesmo';
  if (diffInSeconds < 3600)
    return `há ${Math.floor(diffInSeconds / 60)} minutos`;
  if (diffInSeconds < 86400)
    return `há ${Math.floor(diffInSeconds / 3600)} horas`;
  if (diffInSeconds < 604800)
    return `há ${Math.floor(diffInSeconds / 86400)} dias`;
  return date.toLocaleDateString();
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <section className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Registro de Atividades
        </h1>
      </div>

      <Card className="bg-black border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <ul className="space-y-4">
              {logs.map((log) => {
                const Icon = iconMap[log.action as ActivityType] || Settings;
                const formattedAction = formatAction(log.action as ActivityType);

                return (
                  <li key={log.id} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-200 hover:bg-white/[0.07]">
                    <div className="bg-orange-500/10 rounded-full p-2">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {formattedAction}
                        {log.ipAddress && ` do IP ${log.ipAddress}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getRelativeTime(new Date(log.timestamp))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <Settings className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Nenhuma atividade ainda
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Quando você realizar ações como entrar ou atualizar sua
                conta, elas aparecerão aqui.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
